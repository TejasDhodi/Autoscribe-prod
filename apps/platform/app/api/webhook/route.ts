import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { FAILED_STATUS, SUCCESS_STATUS } from "@/constant/rest-api";
import { createUserData, updateUserData } from "@/actions/user-actions";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SIGNING_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  const headerpayload = await headers();
  const svix_id = headerpayload.get("svix-id");
  const svix_timestamp = headerpayload.get("svix-timestamp");
  const svix_signature = headerpayload.get("svix-signature");
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (error) {
    console.log("Error verifying webhook", error);
    return NextResponse.json(
      {
        status: FAILED_STATUS,
        message: "Error occured -> missing data!",
      },
      {
        status: 400,
      }
    );
  }

  const eventType = evt.type;

  if (eventType === "user.created") {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data;
    if (!id || !email_addresses || !email_addresses.length) {
      return NextResponse.json(
        {
          status: FAILED_STATUS,
          message: "Error occured -> missing data!",
        },
        {
          status: 400,
        }
      );
    }

    const email = email_addresses[0]?.email_address;
    if (!email) {
      return NextResponse.json(
        {
          status: FAILED_STATUS,
          message: "Error occured -> missing data!",
        },
        {
          status: 400,
        }
      );
    }

    try {
      const {
        error,
        user: newUserData,
        errorMessage = "",
      } = await createUserData({
        avatar_url: image_url,
        clerkId: id,
        email: email,
        first_name: first_name,
        last_name: last_name,
        name: `${first_name} ${last_name ? last_name : ""}`,
      });
      console.log(newUserData, "newUserData");
      if (error) throw errorMessage;
      revalidatePath("/");
    } catch (error) {
      return NextResponse.json(
        {
          status: FAILED_STATUS,
          message: "Error occured -> missing data!",
        },
        {
          status: 400,
        }
      );
    }
  }

  if (eventType === "user.updated") {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data;
    if (!id || !email_addresses || !email_addresses.length) {
      return NextResponse.json(
        {
          status: FAILED_STATUS,
          message: "Error occured -> missing data!",
        },
        {
          status: 400,
        }
      );
    }

    const email = email_addresses[0]?.email_address;
    if (!email) {
      return NextResponse.json(
        {
          status: FAILED_STATUS,
          message: "Error occured -> missing data!",
        },
        {
          status: 400,
        }
      );
    }

    try {
      const {
        error,
        user: newUserData,
        errorMessage = "",
      } = await updateUserData({
        avatar_url: image_url,
        clerkId: id,
        email: email,
        first_name: first_name,
        last_name: last_name,
        name: `${first_name} ${last_name ? last_name : ""}`,
      });
      console.log(newUserData, "newUserData");
      if (error) throw errorMessage;
      revalidatePath("/");
    } catch (error) {
      return NextResponse.json(
        {
          status: FAILED_STATUS,
          message: "Error occured -> missing data!",
        },
        {
          status: 400,
        }
      );
    }
  }
  return NextResponse.json(
    { message: "Done with the task", status: SUCCESS_STATUS },
    { status: 200 }
  );
}
