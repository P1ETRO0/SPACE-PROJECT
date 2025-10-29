// Aguarda o HTML ser completamente carregado para executar o script.
document.addEventListener('DOMContentLoaded', () => {
  // Verifica se estamos na página de destino para executar o código específico.
  // CORRIGIDO: de 'technology' para 'tech'
  if (document.body.classList.contains('tech')) {
    initTechnologyPage();
  }
});


async function initTechnologyPage() {
  const data = await fetchData();
  if (!data) return; // Se não conseguir carregar os dados, para a execução.

  const technology = data.technology;

  //! 1. Selecionar os elementos do HTML que vamos manipular.
  const vehicleName = document.querySelector('.tech-details h1');
  const vehicleDescription = document.querySelector('.tech-bio');
  const vehicleImage = document.querySelector('.tech-right img');

  const techLinks = document.querySelectorAll('.tech-nav ul li a');

  //! 2. Função para atualizar as informações na tela
  function updateContent(techItem) {
    vehicleName.textContent = techItem.name;
    vehicleDescription.textContent = techItem.description;

    // O design muda a imagem com base no tamanho da tela
    if (window.innerWidth < 1000) { // Telas pequenas (tablet/mobile)
      vehicleImage.src = techItem.images.landscape;
    } else { // Telas grandes (desktop)
      vehicleImage.src = techItem.images.portrait;
    }
    vehicleImage.alt = `Picture of ${techItem.name}`;
  }

  //
  // CORRIGIDO: O código abaixo foi movido para DENTRO da função
  //
  techLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault(); // Evita que o link tente recarregar ou navegar para outra página.

      techLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      const selectedIndex = link.dataset.tech;
      const selectedTechData = technology[selectedIndex];

      if (selectedTechData) {
        updateContent(selectedTechData);
      }
    });
  });

  // CORRIGIDO: Também movido para DENTRO da função
  updateContent(technology[0]);

} // A FUNÇÃO AGORA TERMINA AQUI


//? Função genérica para buscar os dados do JSON
async function fetchData() {
  try {
    const response = await fetch('./data.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Não foi possível carregar o arquivo data.json:", error);
    return null;
  }
}