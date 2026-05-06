import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

type SanityWebhookBody = {
  _type?: string;
  _id?: string;
  slug?: string;
};

export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;

  if (!secret) {
    return new Response("Missing revalidate secret", { status: 500 });
  }

  try {
    const { body, isValidSignature } = await parseBody<SanityWebhookBody>(
      req,
      secret,
      true,
    );

    if (!isValidSignature) {
      return new Response("Invalid signature", { status: 401 });
    }

    const tags = ["catalog"];
    if (body?._type) tags.push(body._type);

    for (const tag of tags) {
      revalidateTag(tag, { expire: 0 });
    }

    return NextResponse.json({ revalidated: true, tags, body });
  } catch (error) {
    return new Response((error as Error).message, { status: 500 });
  }
}
