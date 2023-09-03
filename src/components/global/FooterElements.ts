import styled from "@emotion/styled";

export const Container = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  padding: 16px;
  display: grid;

  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  color: #696b6a;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 6px;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const ListItem = styled.li`
  padding: 8px 0;
  font-size: 1rem;
  list-style-type: none;
`;

export const SocialIcons = styled.div`
  display: flex;
  justify-content: left;
  margin: 2px 0;
`;

export const Links = styled.a`
  color: #696b6a;
  display: flex;
  align-items: center;
  text-decoration: none;
  font-weight: bold;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #329c37;
  }

  &.active {
    border-bottom: 3px solid #d6b495;
  }
`;
