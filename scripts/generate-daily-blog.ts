/**
 * Generate one Makeup Hub blog post for today.
 *
 *   npx tsx scripts/generate-daily-blog.ts
 *   npx tsx scripts/generate-daily-blog.ts --force
 */
import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(process.cwd(), ".env.local") });
config({ path: resolve(process.cwd(), ".env") });

async function main() {
  const force = process.argv.includes("--force");
  const { generateDailyBlogPost } = await import("../lib/blog/generate");
  const result = await generateDailyBlogPost({ force });
  if (!result.created) {
    console.log(result.reason ?? "No post created.");
    process.exit(0);
  }
  console.log(`Created: ${result.post?.title}`);
  console.log(`Slug: /blog/${result.post?.slug}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
