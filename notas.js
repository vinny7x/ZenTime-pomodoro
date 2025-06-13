useEffect(() => {
  console.log(Date.now());
}); //executa toda vez que o componente renderiza na tela

useEffect(() => {
  console.log(Date.now());
}, []); //executa apenas quando o React monta o componente na tela pela primeira vez

useEffect(() => {
  document.documentElement.setAttribute("data-theme", theme);

  return () => {
    console.log("Componente será atualizado");
  }; //função CleanUp, antes de mudar algo ele executa essa função
}, [theme]); //executa apena quando o valor de 'theme' muda

//para mudar um state que é uma array ou objeto deve-se refazer a array ou objeto
setState(prevState=> {
      return {
        ...prevState,
        currentCycle:5
      }
    })