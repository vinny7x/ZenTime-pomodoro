import { useEffect } from "react";
import { Container } from "../../components/Container";
import { Countdown } from "../../components/CoundDown";
import { MainForm } from "../../components/MainForm";
import { MainTemplate } from "../../templates/MainTemplate";

export function Home() {
   useEffect(()=>{
      document.title = "ZenTime"
    },[])
  return (
    <MainTemplate>
      <Container>
        <Countdown />
      </Container>

      <Container>
        <MainForm />
      </Container>
    </MainTemplate>
  );
}
