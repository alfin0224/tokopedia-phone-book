import styled from '@emotion/styled';

export const ContactContainer = styled.div`
min-height: 800px;
padding-top: 50px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

@media screen and (max-width: 1024px){
  padding: 30px 0;
  min-height: 500px;
}

h1 {
  margin-bottom: 20px;
}
`;

export const ContactListWrapper = styled.div`
    max-width: full-width;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    align-items: center;
    grid-gap: 19px;
    padding: 0 0px;

    @media screen and (max-width:1024px){
        grid-template-columns: 1fr 1fr 1fr;
    }

    @media screen and (max-width: 768px){
        grid-template-columns: 1fr;
        padding: 0 20px;
    }
`;

export const ContactListContainer = styled.div`
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 250px;
  max-width: 600px;
  margin: 0 auto;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  transition: all 0.2s ease-in-out;

  .contact-card {
    background-color: white;
    border-radius: 8px;
    padding: 15px;
    margin: 10px 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    h2 {
      margin: 0;
      font-size: 1.2rem;
      color: #333;
    }

    p {
      margin: 8px 0;
      font-size: 0.9rem;
      color: #777;
    }
  }

  @media (max-width: 768px) {
    .contact-card {
      padding: 10px;
    }
  }
`;

export const ContactCard = styled.div`
  border: 1px solid #ccc;
  width: 220px;
  text-align: center;
  padding: 10px;
  margin: 10px;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

export const ButtonCardContainer = styled.div`
  border: 1px solid #ccc;
  width: 220px;
  padding: 10px;
  margin: 10px;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  button {
    color: #fff;
    margin-right: 5px;
    padding: 5px 10px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }
  .btn-delete {
    background-color: #e02424;
    &:hover {
      background-color: #a31818;
    }
  }

  .btn-edit {
    background-color: #ed9715;
    &:hover {
      background-color: #ad6f11;
    }
  }

  .btn-favorite {
    background-color: #0abac7;
    &:hover {
      background-color: #089ba6;
    }
  }
`;

export const SearchInputContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 2rem;
  padding: 8px;
  width: 100%;
  max-width: 700px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  input {
    flex: 1;
    border: none;
    outline: none;
    padding: 0;
    margin-left: 8px;
  }

  button {
    border: none;
    background: none;
    cursor: pointer;
    padding: 4px;
  }

  @media (max-width: 768px) {
    max-width: 300px;
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom:30px;

  button {
    padding: 5px 10px;
    border-radius: 7px;
    margin: 3px;
    border: 1px solid #ccc;
    background-color: white;
    color: #333;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s, border-color 0.3s;

    &:hover {
      background-color: #f2f2f2;
    }

    &:disabled {
      cursor: not-allowed;
      color: #ccc;
      border-color: #ccc;
    }
  }

  button.active {
    background-color: #2abd38;
    color: white;
    border-color: #329c37;
  }
`;

export const ActionButton = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  margin: 8px;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.2s;

  &:hover {
    transform: translateY(1px);
  }
  
  button {
    font-size: 1.2rem;
    padding: 8px 12px;
    background-color: #2abd38;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      background-color: #329c37;
    }
  }

  @media (max-width: 768px) {
    button {
      font-size: 1rem;
    }
  }
`;

export const FormContainer = styled.div`
  max-width: 800px;
  min-height: 750px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 20px;

  @media screen and (max-width:1024px){
    min-height: 1100px;
}

  @media screen and (max-width:768px){
    min-height: 450px;
  }
`;

export const Form = styled.form`
background-color: #fff;
border-radius: 8px;
box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
padding: 20px;

input {
  width: 300px;
  margin: 10px;
}

button {
  height: 2.4rem;
  background-color: #2abd38;
  color: #fff;
  margin: 5px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #329c37;
  }
}

input,
button {
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

@media screen and (max-width:1024px){
  zoom: 200%;
}

@media screen and (max-width:768px){
  input {
    width: 260px;
  }
  zoom: 100%;
}

`;