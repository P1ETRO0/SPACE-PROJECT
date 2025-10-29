// Aguarda o HTML ser completamente carregado para executar o script.
document.addEventListener('DOMContentLoaded', () => {
  // Verifica se estamos na página de destino para executar o código específico.
  if (document.body.classList.contains('destination')) {
    initDestinationPage();
  }
});


async function initDestinationPage() {
  const data = await fetchData();
  if (!data) return; // Se não conseguir carregar os dados, para a execução.

  const destinations = data.destinations;

  //! 1. Selecionar os elementos do HTML que vamos manipular.
  const planetImage = document.querySelector('.destination-left img');
  const planetName = document.querySelector('.destination-right h1');
  const planetDescription = document.querySelector('.destination-right p');
  const planetDistance = document.querySelector('.destination-info div:nth-child(1) .subheading-1');
  const planetTravelTime = document.querySelector('.destination-info div:nth-child(2) .subheading-1');

  const navLinks = document.querySelectorAll('.destination-nav ul li a');

  //! 2. Função para atualizar as informações na tela
  function updateContent(destinations) {
    planetImage.src = destinations.images.png;
    planetImage.alt = `A ${destinations.name}`;
    planetName.textContent = destinations.name;
    planetDescription.textContent = destinations.description;
    planetDistance.textContent = destinations.distance;
    planetTravelTime.textContent = destinations.travel;
  }

  //! 3. Adicionar os 'ouvintes de clique' nos links de navegação dos planetas
  navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault(); // Evita que o link tente recarregar ou navegar para outra página.

      // Remove a classe 'active' de todos os links.
      navLinks.forEach(l => l.classList.remove('active'));
      // Adiciona a classe 'active' apenas no link clicado.
      link.classList.add('active');

      const selectedPlanetName = link.textContent;
      const selectedPlanetData = destinations.find(dest => dest.name.toLowerCase() === selectedPlanetName.toLowerCase());

      if (selectedPlanetData) {
        updateContent(selectedPlanetData);
      }
    });
  });

  //! 4. Carregar os dados do primeiro destino (Lua) ao iniciar a página
  updateContent(destinations[0]);
}

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