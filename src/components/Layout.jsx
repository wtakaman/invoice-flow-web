import React from 'react';
import { Container } from 'semantic-ui-react';
import Header from './Header';

function Layout(props) {
  return (
    <Container>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
      />
      <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
      <Header />
      { props.children }
      <h1>Footer</h1>
    </Container>
  );
}
export default Layout;
