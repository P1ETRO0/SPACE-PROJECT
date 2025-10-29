document.addEventListener('DOMContentLoaded', () => {
  if (document.body.classList.contains('crew')) {
    initCrewPage();
  }
});

async function initCrewPage() {
  const data = await fetchData();
  if (!data) return; // Se não conseguir carregar os dados, para a execução.

  const crews = data.crews;

  //! 1. Selecionar os elementos do HTML que vamos manipular.
  const crewProfession = document.querySelector('.crew-details h3');
  const crewName = document.querySelector('.crew-details h1');
  const crewBio = document.querySelector('.crew-details p');
  const crewImage = document.querySelector('.crew-right img')

  const crewNavLinks = document.querySelectorAll('.crew-nav ul li a');

  //! 2. Função para atualizar as informações na tela
  function updateContent(crewMember) {
    crewProfession.textContent = crewMember.role;
    crewName.textContent = crewMember.name;
    crewBio.textContent = crewMember.bio;
    crewImage.src = crewMember.images.png;
    crewImage.alt = `Picture of ${crewMember.name}`;

  }

  crewNavLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault(); // Evita que o link tente recarregar ou navegar para outra página.
      // Remove a classe 'active' de todos os links.
      crewNavLinks.forEach(l => l.classList.remove('active'));
      // Adiciona a classe 'active' apenas no link clicado.
      link.classList.add('active');


      // Pega o NÚMERO do atributo 'data-crew' (ex: "0", "1", "2")
      const selectedDot = link.dataset.crew;
      // Pega o membro da tripulação direto do array usando o índice
      const selectedCrewData = crews[selectedDot];

      if (selectedCrewData) {
        updateContent(selectedCrewData);
      }
    });
  });
  updateContent(crews[0]);
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