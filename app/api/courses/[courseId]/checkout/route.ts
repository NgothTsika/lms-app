// app/api/courses/[courseId]/checkout/route.ts

import { stripe } from "@/lib/stripe";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await prisma.course.findUnique({
      where: { id: params.courseId },
    });

    if (!course) {
      return new NextResponse("Course not found", { status: 404 });
    }

    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${params.courseId}?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${params.courseId}?canceled=1`,
      metadata: {
        userId: currentUser.id,
        courseId: course.id,
      },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            product_data: {
              name: course.title,
              description: course.description ?? undefined,
            },
            unit_amount: Math.round((course.price ?? 0) * 100),
          },
        },
      ],
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    console.error("Checkout Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
