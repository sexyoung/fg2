import type { NextPage } from 'next';
import Layout from '../../components/layout';

// export const getServerSideProps: GetServerSideProps = async({ query, res }) => {
//   console.log(query);
  
//   return {
//     props: query,
//   }
// }

interface Props {
  user: string;
}

const Edit: NextPage<Props> = ({ user }) => {
  // Show the user. No loading state is required
  console.log(user);
  
  return (
    <Layout>
      <h1>Your Profile {user}</h1>
      {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
    </Layout>
  )
}

export default Edit;