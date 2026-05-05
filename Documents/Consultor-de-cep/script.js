async function buscarCEP() {
  const cep = document.getElementById('cep').value.replace(/\D/g, '');
  const resultado = document.getElementById('resultado');

  if (cep.length !== 8) {
    resultado.innerHTML = '<p class="erro">⚠️ Digite um CEP válido com 8 dígitos.</p>';
    return;
  }

  resultado.innerHTML = '<p>Buscando...</p>';

  try {
    const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const dados = await resposta.json();

    if (dados.erro) {
      resultado.innerHTML = '<p class="erro">❌ CEP não encontrado.</p>';
      return;
    }

    resultado.innerHTML = `
      <div class="card">
        <p>📮 <span>CEP:</span> ${dados.cep}</p>
        <p>🏠 <span>Logradouro:</span> ${dados.logradouro}</p>
        <p>🏘️ <span>Bairro:</span> ${dados.bairro}</p>
        <p>🏙️ <span>Cidade:</span> ${dados.localidade}</p>
        <p>🗺️ <span>Estado:</span> ${dados.uf}</p>
      </div>
    `;
  } catch (erro) {
    resultado.innerHTML = '<p class="erro">❌ Erro ao conectar com a API. Tente novamente.</p>';
  }
}