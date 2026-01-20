import { Link, graphql, type PageProps } from "gatsby"

import { Layout } from "../components/layout"
import { Seo } from "../components/seo"
import styled from "styled-components"
import profileImage from "./127269.png"

interface DataType {
  site: {
    siteMetadata: {
      title: string
    }
  }
  allMarkdownRemark: {
    nodes: {
      fields: { slug: string }
      frontmatter: { date: string; title: string }
      html: string
    }[]
  }
}

function excerpt(html: string, limit: number) {
  const text = html.replace(/<[^>]+>/g, '');
  return text.length > limit ? text.slice(0, limit) + '...' : text;
}

function IndexPage({ data }: PageProps<DataType>) {
  const posts = data.allMarkdownRemark.nodes

  return (
    <Layout title={data.site.siteMetadata.title}>
      <IntroSection>
        <ProfileImg src={profileImage} alt="Yusuke Shibata" width="128" height="128" />
        <p>
          2019年からニューヨークに在住しているYusuke Shibataのウェブサイトです。<br />
          ソフトウェアエンジニアとして働いています。<br />
        </p>
        <p>
          GitHub: <a href="https://github.com/yusukeshib/" target="_blank" rel="noopener noreferrer">yusukeshib</a><br />
          LinkedIn: <a href="https://www.linkedin.com/in/yusukeshib/" target="_blank" rel="noopener noreferrer">yusukeshib</a><br />
        </p>
      </IntroSection>

      <List>
        {posts.map(post => {
          const date = new Intl.DateTimeFormat('ja', { dateStyle: 'medium' }).format(new Date(post.frontmatter.date))
          return (
            <ListItem key={post.fields.slug}>
              <DateLabel>
                {date}
              </DateLabel>
              <Link to={post.fields.slug}>
                {post.frontmatter.title || excerpt(post.html ?? "", 48)}
              </Link>
            </ListItem>
          )
        })}
      </List>
    </Layout>
  )
}

export default IndexPage

export function Head() {
  return <Seo title="Home" />
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { hidden: { ne: true } } }
      limit: 100
    ) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          date
          title
        }
        html
      }
    }
  }
`

const ProfileImg = styled.img`
  border-radius: 50%;
`

const IntroSection = styled.section`
  margin-bottom: 2rem;
`

const DateLabel = styled.span`
  margin-right: 1em;
`

const List = styled.ul`
  list-style: none;
  padding: 0;
`

const ListItem = styled.li`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
