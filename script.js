
document.addEventListener('DOMContentLoaded', function () {
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
        fetchProfileData();
        fetchGitHubRepos();
    } else if (window.location.pathname.endsWith('repo.html')) {
        loadRepoDetails();
    }
});

function fetchProfileData() {
    fetch('db/db.json')
        .then(response => response.json())
        .then(data => {
            const perfil = data.perfil;
            document.getElementById('name').textContent = perfil.nome;
            document.getElementById('bio').textContent = perfil.bio;
            document.getElementById('linkedin').href = perfil.linkedin;
            document.getElementById('linguagens').textContent = perfil.linguagens;
            document.getElementById('Sobre').textContent = perfil.Sobre;

        })
        .catch(error => console.error('Erro ao buscar dados do perfil:', error));
}

function fetchGitHubRepos() {
    const username = 'jotadev4'; // Nome de usuário do GitHub
    const reposContainer = document.getElementById('repos');

    fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then(repos => {
            repos.forEach(repo => {
                const repoCard = `
                    <div class="col-md-4 mb-4">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">${repo.name}</h5>
                                <p class="card-text">${repo.description || 'Sem descrição'}</p>
                                <a href="${repo.html_url}" class="btn btn-primary" target="_blank">Ver Repositório</a>
                            </div>
                        </div>
                    </div>
                `;
                reposContainer.innerHTML += repoCard;
            });
        })
        .catch(error => console.error('Erro ao buscar repositórios:', error));
}

function loadRepoDetails() {
    const repoId = localStorage.getItem('selectedRepo');
    const repo = JSON.parse(sessionStorage.getItem(repoId));
    if (repo) {
        const repoDetailsContainer = document.getElementById('repo-details');
        const repoDetails = `
            <h2>${repo.name}</h2>
            <p>${repo.description || 'Sem descrição'}</p>
            <p><strong>Última atualização:</strong> ${new Date(repo.updated_at).toLocaleDateString()}</p>
            <p><a href="${repo.html_url}" class="btn btn-secondary" target="_blank">Ver no GitHub</a></p>
        `;
        repoDetailsContainer.innerHTML = repoDetails;
    } else {
        document.getElementById('repo-details').innerHTML = '<p>Repositório não encontrado.</p>';
    }
}