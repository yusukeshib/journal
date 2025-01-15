import * as React from "react"
import { Link, graphql, type PageProps } from "gatsby"
import { styled } from "styled-components"

import { Layout } from "../components/layout"
import { Seo } from "../components/seo"
import { Collapsable } from "../components/collapsable"

function IndexRoute({ data, location }: PageProps<DataProps>) {
  const posts = data.allMarkdownRemark.nodes.filter(node =>
    node.fields.slug.startsWith("/blog/")
  )

  if (posts.length === 0) {
    return (
      <Layout location={location}>
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location}>
      <h2>Yusuke Shibata</h2>
      <p>
        Hi, I'm Yusuke Shibata, a software engineer in United States. I'm
        originally from Japan. I had lived in Japan for almost fourty years. And
        I decided to move to New York City in United States.
      </p>
      <Collapsable title={<H3>Journal (in Japanese)</H3>}>
        <ul>
          {posts.map(post => {
            const title = post.frontmatter.title || post.fields.slug

            return (
              <li key={post.fields.slug}>
                <Link to={post.fields.slug} itemProp="url">
                  <span itemProp="headline">{title}</span>
                </Link>
                <em> ({post.frontmatter.date})</em>
              </li>
            )
          })}
        </ul>
      </Collapsable>
      <Collapsable title={<H3>Experience</H3>} defaultCollapsed>
        <h4>Fable</h4>
        <em>
          Chief Architect, Principal Software Engineer / 2019 - 2024 / New York
          City, NY
        </em>
        <ul>
          <li>
            Fable is a browser-based motion design tool for creating animations
            for videos, graphics, or in-app (Lottie)use. Fable had a team of 35
            employees, 20 engineers, and over 60,000 users.
          </li>
          <li>
            As chief architect, designed and implemented the major systems
            including Frontend, Back-end, Web Assembly, task processing infra,
            and the OpenGL-based renderer.
          </li>
          <li>
            Designed a flexible and extensible product structure and a file
            format that gives users the ability to compose reusable and complex
            visual-effect functionality.
          </li>
          <li>
            Led the Rust-based rendering engine including a rendering pipeline,
            shader system and WebAssembly integration.
          </li>
          <li>
            Designed and implemented a highly scalable GPU task (for animation
            frame generations and thumbnail/preview generations) processing
            server structure to support 10,000 instance concurrency with high
            availability.
          </li>
          <li>
            Led development of an AI visual effect functionality using Stable
            Diffusion and Python.
          </li>
          <li>
            Led a project to implement Stripe-based subscription/payment system.
          </li>
        </ul>
        <h4>Gakko</h4>
        <em>
          Engineering Lead, Software Engineer / 2017 - 2019 / Tokyo, Japan
        </em>
        <ul>
          <li>
            Gakko was a platform for creating and selling animated story books
            for children.
          </li>
          <li>
            Designed and implemented backend using Rest API server with NodeJs
            and a deployment system on Github CI + AWS.
          </li>
          <li>
            Designed and implemented front end UI app using React and
            React-Native for multiple platforms
          </li>
          <li>
            Designed and implemented canvas renderer with React-fiber for Web
            and iOS (Objective C)
          </li>
          <li>
            Led the digital team, and the product we implemented attracted
            investors, and the engineering team spun out to my next company
            Fable.
          </li>
        </ul>
        <h4>Semi-transparent Design</h4>
        <em>
          Engineering Lead, Software Engineer / 2003 - 2017 / Tokyo, Japan
        </em>
        <ul>
          <li>
            Worked for many art installations to help many artists by writing
            interactive code using C, C++.
          </li>
          <li>
            JAXA space center website: Led a project to organize a massive
            amount of documents written by JAXA scientists, and implemented an
            organization system and administration web app based on WIKI
            structure.
          </li>
          <li>
            LeoLeoni interactive exhibition: Planned, managed and built an
            interactive space installation using OpenGL, Mac OS app using WebCam
            that was inspired by the famous picture book “Swimmy”.
          </li>
        </ul>
        <h4>IMG SRC</h4>
        <em>Software Engineer / 1999 - 2003 / Tokyo, Japan</em>
        <h4>Creo</h4>
        <em>Software Engineer / 1998 - 1999 / Tokyo, Japan</em>
        <ul>
          <li>
            Worked on a project to implement XML parser in C on Solaris Unix.
          </li>
          <li>
            Participated in a big government-driven project of TV Digital
            transformation. I was part of a sub-project to build a service to
            orchestrate a Radio Wave Transmission System in C, C++ on UNIX in a
            facility of Tokyo tower.
          </li>
          <li>
            Built a high performance chat server as a member of a five engineer
            team on UNIX, C, C++ for KDDI.
          </li>
        </ul>
      </Collapsable>
      <Collapsable title={<H3>Education</H3>} defaultCollapsed>
        <p>The University of Tokyo, Applied physics</p>
      </Collapsable>
    </Layout>
  )
}

export default IndexRoute

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export function Head() {
  return <Seo title="All posts" />
}

type DataProps = {
  site: {
    siteMetadata: {
      title: string
      author: {
        name: string
      }
    }
  }
  allMarkdownRemark: {
    nodes: {
      excerpt: string
      fields: { slug: string }
      frontmatter: {
        date: string
        title: string
        description: string
      }
    }[]
  }
}

const H3 = styled.h3`
  margin: 0;
`

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
        author {
          name
        }
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`
