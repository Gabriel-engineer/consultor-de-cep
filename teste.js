async function testarAPI() {
  console.log("Iniciando teste de integração com ViaCEP...\n");

  // Teste 1 — CEP válido
  try {
    const resposta = await fetch("https://viacep.com.br/ws/01310100/json/");
    const dados = await resposta.json();

    if (dados.localidade === "São Paulo") {
      console.log("✅ TESTE 1 PASSOU: API retornou dados corretos para CEP válido");
      console.log(`   Endereço: ${dados.logradouro}, ${dados.localidade} - ${dados.uf}\n`);
    } else {
      console.log("❌ TESTE 1 FALHOU: Dados inesperados retornados\n");
    }
  } catch (erro) {
    console.log("❌ TESTE 1 FALHOU: Erro ao conectar com a API\n");
  }

  // Teste 2 — CEP inválido
  try {
    const resposta = await fetch("https://viacep.com.br/ws/00000000/json/");
    const dados = await resposta.json();

    if (dados.erro) {
      console.log("✅ TESTE 2 PASSOU: API retornou erro corretamente para CEP inválido\n");
    } else {
      console.log("❌ TESTE 2 FALHOU: API deveria ter retornado erro\n");
    }
  } catch (erro) {
    console.log("❌ TESTE 2 FALHOU: Erro inesperado\n");
  }

  console.log("Testes concluídos!");
}

testarAPI();