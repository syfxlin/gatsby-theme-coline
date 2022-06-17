import { graphql } from "gatsby";
import React from "react";
import { convert } from "../queries/groups";
import { LayoutType } from "../utils/urls";
import GroupsPage from "./groups";

export type ArchivesPageProps = {
  data: Queries.ArchivesPageQueryQuery;
  pageContext: {
    archive: number;
    current: number;
    size: number;
    total: number;
  };
};

const ArchivesPage: React.FC<ArchivesPageProps> = (props) => {
  const data = convert(props.data);
  const ctx = props.pageContext;
  return (
    <GroupsPage
      data={data}
      id={ctx.archive}
      type="归档"
      layout={LayoutType.ARCHIVE}
      current={ctx.current}
      size={ctx.size}
      total={ctx.total}
    />
  );
};

export default ArchivesPage;

export const query = graphql`
  query ArchivesPageQuery(
    $archive: Int
    $skip: Int!
    $limit: Int!
    $status: [String!]!
  ) {
    allMdx(
      skip: $skip
      limit: $limit
      filter: {
        fields: { date_year: { eq: $archive } }
        frontmatter: { layout: { eq: "post" }, status: { in: $status } }
      }
      sort: { order: DESC, fields: frontmatter___date }
    ) {
      nodes {
        frontmatter {
          title
          date(formatString: "YYYY-MM-DD")
          thumbnail {
            childImageSharp {
              gatsbyImageData
            }
          }
          categories
          tags
        }
        fields {
          slug
        }
        excerpt
      }
    }
  }
`;
