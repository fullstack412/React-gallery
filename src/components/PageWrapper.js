import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: 'Heebo Regular';
`;
const MainWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1 1 auto;
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #fafafa;
`;
const Content = styled.div`
  padding: 40px;
`;

const PageWrapper = (props) => (
	<Wrapper>
		<MainWrapper>
			<ContentWrapper>
				<Content>
				{ props.children }
				</Content>
			</ContentWrapper>
		</MainWrapper>
	</Wrapper>
);

export default PageWrapper