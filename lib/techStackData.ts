export interface TechItem {
    name: string;
    icon: string;
    href: string;
}

export interface TechCategory {
    title: string;
    items: TechItem[];
}

export const techStackData: TechCategory[] = [
    {
        title: "Frontend Development",
        items: [
            { name: "React Native", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", href: "https://reactnative.dev/" },
            { name: "Expo GO", icon: "https://www.vectorlogo.zone/logos/expoio/expoio-icon.svg", href: "https://expo.dev/" },
            { name: "D3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/d3js/d3js-original.svg", href: "https://d3js.org/" },
            { name: "Next.js", icon: "https://www.vectorlogo.zone/logos/nextjs/nextjs-icon.svg", href: "https://nextjs.org/" },
            { name: "swftui", icon: "https://cdn.worldvectorlogo.com/logos/swiftui.svg", href: "https://developer.apple.com/xcode/swiftui/" },
            { name: "Kotlin", icon: "https://www.vectorlogo.zone/logos/kotlinlang/kotlinlang-icon.svg", href: "https://kotlinlang.org/" },
            { name: "React + Vite", icon: "https://www.vectorlogo.zone/logos/vitejs/vitejs-icon.svg", href: "https://vitejs.dev/" },
            { name: "Tailwind CSS", icon: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg", href: "https://tailwindcss.com/" },
        ],
    },
    {
        title: "Backend Development",
        items: [
            { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", href: "https://www.python.org/" },
            { name: "Django", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg", href: "https://www.djangoproject.com/" },
            { name: "beautifulsoup", icon: "https://raw.githubusercontent.com/Lissy93/dashy/master/public/item-icons/beautiful-soup.png", href: "https://www.crummy.com/software/BeautifulSoup/" },
            { name: "Selenium", icon: "https://www.vectorlogo.zone/logos/selenium/selenium-icon.svg", href: "https://www.selenium.dev/" },
            { name: "Golang", icon: "https://www.vectorlogo.zone/logos/golang/golang-icon.svg", href: "https://go.dev/" },
            { name: "Node.js", icon: "https://www.vectorlogo.zone/logos/nodejs/nodejs-icon.svg", href: "https://nodejs.org/" },
            { name: "Flask", icon: "https://www.vectorlogo.zone/logos/pocoo_flask/pocoo_flask-icon.svg", href: "https://flask.palletsprojects.com/" },
            { name: "FastAPI", icon: "https://www.vectorlogo.zone/logos/fastapi/fastapi-icon.svg", href: "https://fastapi.tiangolo.com/" },
            { name: "nestjs", icon: "https://www.vectorlogo.zone/logos/nestjs/nestjs-icon.svg", href: "https://nestjs.com/" },
            { name: "strapi", icon: "https://www.vectorlogo.zone/logos/strapiio/strapiio-icon.svg", href: "https://strapi.io/" },
            { name: "Sanity", icon: "https://www.vectorlogo.zone/logos/sanityio/sanityio-icon.svg", href: "https://www.sanity.io/" },
        ],
    },
    {
        title: "Cloud Infrastructure",
        items: [
            { name: "AWS", icon: "https://www.vectorlogo.zone/logos/amazonwebservices/amazonwebservices-icon.svg", href: "https://aws.amazon.com/" },
            { name: "aws ses", icon: "https://www.vectorlogo.zone/logos/amazon_ses/amazon_ses-icon.svg", href: "https://aws.amazon.com/ses/" },
            { name: "aws ec2", icon: "https://www.vectorlogo.zone/logos/amazon_ec2/amazon_ec2-icon.svg", href: "https://aws.amazon.com/ec2/" },
            { name: "ws r53", icon: "https://www.vectorlogo.zone/logos/amazon_route53/amazon_route53-icon.svg", href: "https://aws.amazon.com/route53/" },
            { name: "aws elb", icon: "https://www.vectorlogo.zone/logos/amazon_elb/amazon_elb-icon.svg", href: "https://aws.amazon.com/elasticloadbalancing/" },
            { name: "Elastic IP", icon: "https://www.vectorlogo.zone/logos/amazon_ec2/amazon_ec2-icon.svg", href: "https://aws.amazon.com/ec2/features/elastic-ip-addresses/" },
            { name: "IAM", icon: "https://www.vectorlogo.zone/logos/amazon_iam/amazon_iam-icon.svg", href: "https://aws.amazon.com/iam/" },
            { name: "Google Cloud Platform (GCP)", icon: "https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg", href: "https://cloud.google.com/" },
            { name: "Azure", icon: "https://www.vectorlogo.zone/logos/microsoft_azure/microsoft_azure-icon.svg", href: "https://azure.microsoft.com/" },
            { name: "Lambda", icon: "https://www.vectorlogo.zone/logos/amazon_lambda/amazon_lambda-icon.svg", href: "https://aws.amazon.com/lambda/" },
            { name: "S3", icon: "https://www.vectorlogo.zone/logos/amazon_s3/amazon_s3-icon.svg", href: "https://aws.amazon.com/s3/" },
            { name: "RDS", icon: "https://www.vectorlogo.zone/logos/amazon_rds/amazon_rds-icon.svg", href: "https://aws.amazon.com/rds/" },
            { name: "API Gateway", icon: "https://www.vectorlogo.zone/logos/amazon_api_gateway/amazon_api_gateway-icon.svg", href: "https://aws.amazon.com/api-gateway/" },
            { name: "Hetzner", icon: "https://www.vectorlogo.zone/logos/hetzner/hetzner-icon.svg", href: "https://www.hetzner.com/" },
            { name: "aws bedrock", icon: "https://raw.githubusercontent.com/clodal/aws-icons/main/Architecture-Service-Icons_01312024/Arch_Machine-Learning/64/Arch_Amazon-Bedrock_64.svg", href: "https://aws.amazon.com/bedrock/" },
        ],
    },
    {
        title: "Database",
        items: [
            { name: "PostgreSQL", icon: "https://www.vectorlogo.zone/logos/postgresql/postgresql-icon.svg", href: "https://www.postgresql.org/" },
            { name: "MongoDB", icon: "https://www.vectorlogo.zone/logos/mongodb/mongodb-icon.svg", href: "https://www.mongodb.com/" },
            { name: "Redis", icon: "https://www.vectorlogo.zone/logos/redis/redis-icon.svg", href: "https://redis.io/" },
            { name: "Kysely", icon: "https://raw.githubusercontent.com/kysely-org/kysely/master/assets/logo.svg", href: "https://kysely.dev/" },
            { name: "MySQL", icon: "https://www.vectorlogo.zone/logos/mysql/mysql-icon.svg", href: "https://www.mysql.com/" },
            { name: "Supabase", icon: "https://www.vectorlogo.zone/logos/supabase/supabase-icon.svg", href: "https://supabase.com/" },
        ],
    },
    {
        title: "Website Development",
        items: [
            { name: "WordPress", icon: "https://www.vectorlogo.zone/logos/wordpress/wordpress-icon.svg", href: "https://wordpress.org/" },
            { name: "Elementor", icon: "https://www.vectorlogo.zone/logos/elementor/elementor-icon.svg", href: "https://elementor.com/" },
            { name: "Custom CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", href: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
        ],
    },
    {
        title: "Design and Prototyping",
        items: [
            { name: "Figma", icon: "https://www.vectorlogo.zone/logos/figma/figma-icon.svg", href: "https://www.figma.com/" },
            { name: "Locofy", icon: "https://www.locofy.ai/favicon.ico", href: "https://www.locofy.ai/" },
        ],
    },
    {
        title: "Analytics and Tracking",
        items: [
            { name: "Mixpanel", icon: "https://www.vectorlogo.zone/logos/mixpanel/mixpanel-icon.svg", href: "https://mixpanel.com/" },
            { name: "Google Analytics", icon: "https://www.vectorlogo.zone/logos/google_analytics/google_analytics-icon.svg", href: "https://analytics.google.com/" },
            { name: "Plausible", icon: "https://www.vectorlogo.zone/logos/plausibleio/plausibleio-icon.svg", href: "https://plausible.io/" },
        ],
    },
    {
        title: "Automation",
        items: [
            { name: "Playwright", icon: "https://playwright.dev/img/playwright-logo.svg", href: "https://playwright.dev/" },
        ],
    },
    {
        title: "Hosting and Deployment",
        items: [
            { name: "Bluehost", icon: "https://www.vectorlogo.zone/logos/bluehost/bluehost-icon.svg", href: "https://www.bluehost.com/" },
            { name: "GoDaddy", icon: "https://www.vectorlogo.zone/logos/godaddy/godaddy-icon.svg", href: "https://www.godaddy.com/" },
            { name: "Namecheap", icon: "https://www.vectorlogo.zone/logos/namecheap/namecheap-icon.svg", href: "https://www.namecheap.com/" },
            { name: "Squarespace", icon: "https://www.vectorlogo.zone/logos/squarespace/squarespace-icon.svg", href: "https://www.squarespace.com/" },
            { name: "Render", icon: "https://www.vectorlogo.zone/logos/render/render-icon.svg", href: "https://render.com/" },
            { name: "Docker", icon: "https://www.vectorlogo.zone/logos/docker/docker-icon.svg", href: "https://www.docker.com/" },
            { name: "Vercel", icon: "https://www.vectorlogo.zone/logos/vercel/vercel-icon.svg", href: "https://vercel.com/" },
        ],
    },
    {
        title: "Development Tools",
        items: [
            { name: "Git", icon: "https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg", href: "https://git-scm.com/" },
            { name: "GitHub", icon: "https://www.vectorlogo.zone/logos/github/github-icon.svg", href: "https://github.com/" },
            { name: "Sonarqube", icon: "https://www.vectorlogo.zone/logos/sonarqube/sonarqube-icon.svg", href: "https://www.sonarqube.org/" },
            { name: "Terraform", icon: "https://www.vectorlogo.zone/logos/terraformio/terraformio-icon.svg", href: "https://www.terraform.io/" },
            { name: "Grafana", icon: "https://www.vectorlogo.zone/logos/grafana/grafana-icon.svg", href: "https://grafana.com/" },
            { name: "Sentry", icon: "https://www.vectorlogo.zone/logos/sentryio/sentryio-icon.svg", href: "https://sentry.io/" },
            { name: "Cloudflare", icon: "https://www.vectorlogo.zone/logos/cloudflare/cloudflare-icon.svg", href: "https://www.cloudflare.com/" },
        ],
    },
    {
        title: "AI",
        items: [
            { name: "LLMs", icon: "https://www.vectorlogo.zone/logos/openai/openai-icon.svg", href: "https://openai.com/" },
            { name: "OpenAI API", icon: "https://www.vectorlogo.zone/logos/openai/openai-icon.svg", href: "https://openai.com/api/" },
            { name: "Copilot", icon: "https://www.vectorlogo.zone/logos/github/github-icon.svg", href: "https://github.com/features/copilot" },
            { name: "Perplexity", icon: "https://ui-avatars.com/api/?name=P&background=000&color=fff", href: "https://www.perplexity.ai/" },
            { name: "Machine learning", icon: "https://www.vectorlogo.zone/logos/tensorflow/tensorflow-icon.svg", href: "https://en.wikipedia.org/wiki/Machine_learning" },
            { name: "AWS Bedrock", icon: "https://raw.githubusercontent.com/clodal/aws-icons/main/Architecture-Service-Icons_01312024/Arch_Machine-Learning/64/Arch_Amazon-Bedrock_64.svg", href: "https://aws.amazon.com/bedrock/" },
            { name: "Claude", icon: "https://avatars.githubusercontent.com/u/76373302?s=200&v=4", href: "https://www.anthropic.com/" },
            { name: "Codex", icon: "https://www.vectorlogo.zone/logos/openai/openai-icon.svg", href: "https://openai.com/blog/openai-codex" },
            { name: "langfuse", icon: "https://langfuse.com/langfuse_logo_icon.svg", href: "https://langfuse.com/" },
            { name: "DeepEval", icon: "https://raw.githubusercontent.com/confident-ai/deepeval/main/docs/static/img/logo.png", href: "https://www.confident-ai.com/" },
            { name: "ChatGPT", icon: "https://www.vectorlogo.zone/logos/openai/openai-icon.svg", href: "https://chat.openai.com/" },
            { name: "MCP connectors", icon: "https://ui-avatars.com/api/?name=MCP&background=005c89&color=fff", href: "https://modelcontextprotocol.io/" },
            { name: "Smithery", icon: "https://ui-avatars.com/api/?name=S&background=66c2e2&color=fff", href: "https://smithery.ai/" },
            { name: "Langchain", icon: "https://raw.githubusercontent.com/langchain-ai/langchain/master/docs/static/img/logo.svg", href: "https://www.langchain.com/" },
        ],
    },
    {
        title: "Authentication and security",
        items: [
            { name: "jwt", icon: "https://www.vectorlogo.zone/logos/jwtio/jwtio-icon.svg", href: "https://jwt.io/" },
            { name: "auth0", icon: "https://www.vectorlogo.zone/logos/auth0/auth0-icon.svg", href: "https://auth0.com/" },
            { name: "grpc", icon: "https://www.vectorlogo.zone/logos/grpcio/grpcio-icon.svg", href: "https://grpc.io/" },
            { name: "better-auth", icon: "https://raw.githubusercontent.com/better-auth/better-auth/main/assets/logo.svg", href: "https://www.better-auth.com/" },
        ],
    },
    {
        title: "Package Managers",
        items: [
            { name: "npm", icon: "https://www.vectorlogo.zone/logos/npmjs/npmjs-icon.svg", href: "https://www.npmjs.com/" },
            { name: "Pdm", icon: "https://raw.githubusercontent.com/pdm-project/pdm/main/docs/static/img/logo.png", href: "https://pdm.fming.dev/" },
            { name: "pip", icon: "https://www.vectorlogo.zone/logos/python/python-icon.svg", href: "https://pypi.org/project/pip/" },
            { name: "pnpm", icon: "https://www.vectorlogo.zone/logos/pnpm/pnpm-icon.svg", href: "https://pnpm.io/" },
            { name: "uv", icon: "https://raw.githubusercontent.com/astral-sh/uv/main/assets/uv_logo.svg", href: "https://github.com/astral-sh/uv" },
        ],
    },
    {
        title: "IDE",
        items: [
            { name: "VS Code", icon: "https://www.vectorlogo.zone/logos/visualstudio_code/visualstudio_code-icon.svg", href: "https://code.visualstudio.com/" },
            { name: "cursor", icon: "https://mintlify.s3-us-west-1.amazonaws.com/cursor/logo/light.svg", href: "https://cursor.sh/" },
            { name: "Antigravity", icon: "https://ui-avatars.com/api/?name=AG&background=005c89&color=fff", href: "#" },
            { name: "windsurf", icon: "https://www.codeium.com/windsurf/logo.svg", href: "https://www.codeium.com/windsurf" },
        ],
    },
    {
        title: "Integrations",
        items: [
            { name: "Shopify APIs, Apps", icon: "https://www.vectorlogo.zone/logos/shopify/shopify-icon.svg", href: "https://www.shopify.com/" },
            { name: "Stripe API", icon: "https://www.vectorlogo.zone/logos/stripe/stripe-icon.svg", href: "https://stripe.com/" },
            { name: "clerk", icon: "https://www.vectorlogo.zone/logos/clerkly/clerkly-icon.svg", href: "https://clerk.dev/" },
            { name: "Open AI SDK", icon: "https://www.vectorlogo.zone/logos/openai/openai-icon.svg", href: "https://openai.com/" },
            { name: "Facebook Business", icon: "https://www.vectorlogo.zone/logos/facebook/facebook-icon.svg", href: "https://business.facebook.com/" },
            { name: "Slack API", icon: "https://www.vectorlogo.zone/logos/slack/slack-icon.svg", href: "https://api.slack.com/" },
        ],
    },
    {
        title: "Testing",
        items: [
            { name: "Eslint + Prettier", icon: "https://www.vectorlogo.zone/logos/eslint/eslint-icon.svg", href: "https://eslint.org/" },
            { name: "Pytest", icon: "https://www.vectorlogo.zone/logos/pytest/pytest-icon.svg", href: "https://docs.pytest.org/" },
        ],
    },
    {
        title: "SEO and Web performance",
        items: [
            { name: "lighthouse", icon: "https://www.vectorlogo.zone/logos/google_lighthouse/google_lighthouse-icon.svg", href: "https://developer.chrome.com/docs/lighthouse/overview/" },
        ],
    },
    {
        title: "Extensions and plugins",
        items: [
            { name: "Chrome Extension", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/chrome/chrome-original.svg", href: "https://developer.chrome.com/docs/extensions/" },
            { name: "Firefox Addon", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firefox/firefox-original.svg", href: "https://addons.mozilla.org/" },
            { name: "Safari Extension", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/safari/safari-original.svg", href: "https://developer.apple.com/safari/extensions/" },
        ],
    },
];
