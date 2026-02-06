export interface TechItem {
    name: string;
    icon: string;
    href: string;
}

export interface TechCategory {
    title: string;
    items: TechItem[];
}

const CLOUDINARY_BASE = "https://res.cloudinary.com/dejb29i0k/image/upload/v1770353620";


export const techStackData: TechCategory[] = [
    {
        title: "Frontend Development",
        items: [
            { name: "React Native", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", href: "https://reactnative.dev/" },
            { name: "D3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/d3js/d3js-original.svg", href: "https://d3js.org/" },
            { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", href: "https://nextjs.org/" },
            { name: "SwiftUI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg", href: "https://developer.apple.com/xcode/swiftui/" },
            { name: "Kotlin", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg", href: "https://kotlinlang.org/" },
            { name: "Vite", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg", href: "https://vitejs.dev/" },
            { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", href: "https://tailwindcss.com/" },
            { name: "Expo", icon: `${CLOUDINARY_BASE}/expo_wghug4.svg`, href: "https://expo.dev/" },
        ],
    },
    {
        title: "Backend Development",
        items: [
            { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", href: "https://www.python.org/" },
            { name: "Django", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg", href: "https://www.djangoproject.com/" },
            { name: "Go", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg", href: "https://go.dev/" },
            { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", href: "https://nodejs.org/" },
            { name: "Flask", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg", href: "https://flask.palletsprojects.com/" },
            { name: "FastAPI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg", href: "https://fastapi.tiangolo.com/" },
            { name: "NestJS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg", href: "https://nestjs.com/" },
            { name: "Strapi", icon: `${CLOUDINARY_BASE}/strapi_r4weyi.png`, href: "https://strapi.io/" },
            { name: "BeautifulSoup", icon: `${CLOUDINARY_BASE}/beautifulsoup_avf0oz.png`, href: "https://www.crummy.com/software/BeautifulSoup/" },
            { name: "Selenium", icon: `${CLOUDINARY_BASE}/selenium_kb48c2.png`, href: "https://www.selenium.dev/" },
            { name: "Sanity", icon: `${CLOUDINARY_BASE}/sanity_snlsfh.png`, href: "https://www.sanity.io/" },
        ],
    },
    {
        title: "Cloud Infrastructure",
        items: [
            { name: "AWS", icon: `${CLOUDINARY_BASE}/aws_bb49ai.png`, href: "https://aws.amazon.com/" },
            { name: "GCP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg", href: "https://cloud.google.com/" },
            { name: "Azure", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg", href: "https://azure.microsoft.com/" },
            { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", href: "https://www.docker.com/" },
            { name: "Lambda", icon: `${CLOUDINARY_BASE}/aws-lambda_mwgfck.png`, href: "https://aws.amazon.com/lambda/" },
            { name: "S3", icon: `${CLOUDINARY_BASE}/amazon-s3_ixfpk6.png`, href: "https://aws.amazon.com/s3/" },
            { name: "RDS", icon: `${CLOUDINARY_BASE}/aws-rds_kz4lbd.png`, href: "https://aws.amazon.com/rds/" },
            { name: "API Gateway", icon: `${CLOUDINARY_BASE}/aws-api-gateway_g3uawm`, href: "https://aws.amazon.com/api-gateway/" },
            { name: "Hetzner", icon: `${CLOUDINARY_BASE}/hetzner_zhfgzg.svg`, href: "https://www.hetzner.com/" },
            { name: "AWS Bedrock", icon: `${CLOUDINARY_BASE}/aws_bedrock_mzsows.png`, href: "https://aws.amazon.com/bedrock/" },
            { name: "SES", icon: `${CLOUDINARY_BASE}/aws-ses_m2f3la.png`, href: "https://aws.amazon.com/ses/" },
            { name: "EC2", icon: `${CLOUDINARY_BASE}/aws-ec2_mgkbcu.png`, href: "https://aws.amazon.com/ec2/" },
            { name: "Route53", icon: `${CLOUDINARY_BASE}/aws-route53_ul5o6z.png`, href: "https://aws.amazon.com/route53/" },
            { name: "ELB", icon: `${CLOUDINARY_BASE}/aws-elb_mcsidq.svg`, href: "https://aws.amazon.com/elasticloadbalancing/" },
            { name: "IAM", icon: `${CLOUDINARY_BASE}/aws-iam_skqame.png`, href: "https://aws.amazon.com/iam/" },
        ],
    },
    {
        title: "Databases",
        items: [
            { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", href: "https://www.postgresql.org/" },
            { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", href: "https://www.mongodb.com/" },
            { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg", href: "https://redis.io/" },
            { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", href: "https://www.mysql.com/" },
            { name: "Supabase", icon: `${CLOUDINARY_BASE}/supabase_b4n3ju.webp`, href: "https://supabase.com/" },
            { name: "Kysely", icon: `${CLOUDINARY_BASE}/kysely_ysrdq0.png`, href: "https://kysely.dev/" },
        ],
    },
    {
        title: "Website / CMS",
        items: [
            { name: "WordPress", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-original.svg", href: "https://wordpress.org/" },
            { name: "Elementor", icon: `${CLOUDINARY_BASE}/elementor_xopa8q.png`, href: "https://elementor.com/" },
        ],
    },
    {
        title: "Design",
        items: [
            { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", href: "https://www.figma.com/" },
            { name: "Locofy", icon: `${CLOUDINARY_BASE}/locofy_qzcyzb.png`, href: "https://www.locofy.ai/" },
        ],
    },
    {
        title: "Analytics",
        items: [
            { name: "Mixpanel", icon: `${CLOUDINARY_BASE}/mixpanel_vsyjkg.png`, href: "https://mixpanel.com/" },
            { name: "Plausible", icon: `${CLOUDINARY_BASE}/plausible_frhynp.png`, href: "https://plausible.io/" },
            { name: "Google Analytics", icon: `${CLOUDINARY_BASE}/google-analytics_vb80hu.png`, href: "https://analytics.google.com/" },
        ],
    },
    {
        title: "Automation",
        items: [
            { name: "Playwright", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/playwright/playwright-original.svg", href: "https://playwright.dev/" },
        ],
    },
    {
        title: "Hosting / Deployment",
        items: [
            { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", href: "https://www.docker.com/" },
            { name: "Vercel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg", href: "https://vercel.com/" },
            { name: "Bluehost", icon: `${CLOUDINARY_BASE}/bluehost_dvr5sf.png`, href: "https://www.bluehost.com/" },
            { name: "GoDaddy", icon: `${CLOUDINARY_BASE}/go-daddy_ngfypj.png`, href: "https://www.godaddy.com/" },
            { name: "Namecheap", icon: `${CLOUDINARY_BASE}/namecheap_cxrlol.png`, href: "https://www.namecheap.com/" },
            { name: "Squarespace", icon: `${CLOUDINARY_BASE}/squarespace_y4fmk7.png`, href: "https://www.squarespace.com/" },
            { name: "Render", icon: `${CLOUDINARY_BASE}/render_hixaf8.png`, href: "https://render.com/" },
        ],
    },
    {
        title: "Development Tools",
        items: [
            { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", href: "https://git-scm.com/" },
            { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", href: "https://github.com/" },
            { name: "Terraform", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg", href: "https://www.terraform.io/" },
            { name: "Grafana", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original.svg", href: "https://grafana.com/" },
            { name: "Sonarqube", icon: `${CLOUDINARY_BASE}/sonarqube_qafuik.png`, href: "https://www.sonarqube.org/" },
            { name: "Sentry", icon: `${CLOUDINARY_BASE}/sentry_bebyra.svg`, href: "https://sentry.io/" },
            { name: "Cloudflare", icon: `${CLOUDINARY_BASE}/cloudflare_rc4sim.png`, href: "https://www.cloudflare.com/" },
        ],
    },
    {
        title: "AI",
        items: [
            { name: "TensorFlow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg", href: "https://www.tensorflow.org/" },
            { name: "OpenAI", icon: `${CLOUDINARY_BASE}/openai_q9c1co.webp`, href: "https://openai.com/" },
            { name: "Claude", icon: `${CLOUDINARY_BASE}/claude_zivqvk.png`, href: "https://www.anthropic.com/" },
            { name: "Perplexity", icon: `${CLOUDINARY_BASE}/perplexity_t0azna.png`, href: "https://www.perplexity.ai/" },
            { name: "LangChain", icon: `${CLOUDINARY_BASE}/langchain_wm9ehn.png`, href: "https://www.langchain.com/" },
            { name: "Langfuse", icon: `${CLOUDINARY_BASE}/langfuse_ddvwza.png`, href: "https://langfuse.com/" },
            { name: "DeepEval", icon: `${CLOUDINARY_BASE}/deepeval_bz30bh.png`, href: "https://www.confident-ai.com/" },
            { name: "MCP", icon: `${CLOUDINARY_BASE}/mcp_cb3oxz.png`, href: "https://modelcontextprotocol.io/" },
            { name: "Smithery", icon: `${CLOUDINARY_BASE}/smithery_l8q2xo.png`, href: "https://smithery.ai/" },
        ],
    },
    {
        title: "Auth / Security",
        items: [
            { name: "JWT", icon: `${CLOUDINARY_BASE}/jwt_psgukb.webp`, href: "https://jwt.io/" },
            { name: "gRPC", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grpc/grpc-original.svg", href: "https://grpc.io/" },
            { name: "Auth0", icon: `${CLOUDINARY_BASE}/auth0_q1drnx.webp`, href: "https://auth0.com/" },
            { name: "Better-auth", icon: `${CLOUDINARY_BASE}/better-auth_pqs19x.png`, href: "https://www.better-auth.com/" },
        ],
    },
    {
        title: "Package Managers",
        items: [
            { name: "npm", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg", href: "https://www.npmjs.com/" },
            { name: "pnpm", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pnpm/pnpm-original.svg", href: "https://pnpm.io/" },
            { name: "pdm", icon: `${CLOUDINARY_BASE}/pdm_p9eaq4.png`, href: "https://pdm.fming.dev/" },
            { name: "uv", icon: `${CLOUDINARY_BASE}/uv_udhxrp.png`, href: "https://github.com/astral-sh/uv" },
        ],
    },
    {
        title: "IDE",
        items: [
            { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg", href: "https://code.visualstudio.com/" },
            { name: "Cursor", icon: `${CLOUDINARY_BASE}/cursor_z8srkj.png`, href: "https://cursor.sh/" },
            { name: "Windsurf", icon: `${CLOUDINARY_BASE}/windsurf_a5abuj.svg`, href: "https://www.codeium.com/windsurf" },
            { name: "Antigravity", icon: `${CLOUDINARY_BASE}/antigravity_h8qwow.png`, href: "https://antigravity.google/" },
        ],
    },
];
