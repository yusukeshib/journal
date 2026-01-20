/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

const postComponent = path.resolve(`./src/templates/post.tsx`)
const listComponent = path.resolve(`./src/templates/list.tsx`)

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ graphql, actions, reporter }) => {
  const result = await graphql(`
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
          id
          excerpt(pruneLength: 160)
          html
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            hidden
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  const map = {};
  const posts = result.data.allMarkdownRemark.nodes
    .filter(post => !post.frontmatter.hidden)
    .map(post => {
      const components = post.fields.slug.split('/').filter(Boolean)
      const category = components.slice(0, -1).join('/');
      return { ...post, category };
    });

  for (const post of posts) {
    if (!map[post.category]) map[post.category] = [];
    map[post.category].push(post);
  }

  const siteMetadata = {
    title: result.data.site.siteMetadata.title,
    author: result.data.site.siteMetadata.author,
  }

  // posts
  for (const posts of Object.values(map)) {
    posts.forEach((post, index) => {
      const nextPost = index === 0 ? null : posts[index - 1]
      const previousPost = index === posts.length - 1 ? null : posts[index + 1]

      actions.createPage({
        path: post.fields.slug,
        component: postComponent,
        context: {
          id: post.id,
          post,
          previousPost,
          nextPost,
          siteMetadata,
        },
      })
    })
  }

  // category index
  for (const [category, posts] of Object.entries(map)) {
    if (!category) continue;
    actions.createPage({
      path: `/${category}/`,
      component: listComponent,
      context: {
        posts,
        category,
        siteMetadata,
      },
    })
  }

}

/**
 * @type {import('gatsby').GatsbyNode['onCreateNode']}
 */
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

/**
 * @type {import('gatsby').GatsbyNode['createSchemaCustomization']}
 */
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
      hidden: Boolean
    }

    type Fields {
      slug: String
    }
  `)
}
