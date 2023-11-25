import * as React from "react"

import { Layout } from "../components/layout"
import { Seo } from "../components/seo"

const NotFoundPage: React.FC<Record<string, never>> = function NotFoundPage() {
  return (
    <Layout>
      <Seo title="404: Not found" />
      <h1>404: Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  )
}

export default NotFoundPage;
