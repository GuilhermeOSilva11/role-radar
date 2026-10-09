RolêRadar

# Integrante
Guilherme Oliveira da Silva 2040482323043

# Como executar
É necessário ter Git e Node.js com npm instalados.

A partir de um clone no repositório é necessário que:

1. No terminal, dentro da pasta do projeto, instale todas as dependências utilizando `npm install`
Dependências utilizadas:
    - React e React DOM;
    - PrimeReact (`@primereact/ui` e os demais pacotes registrados);
    - temas PrimeUI (`@primeuix/themes`);
    - ícones (`@primeicons/react` e `primeicons`);
    - PrimeFlex (`primeflex`);
    - Axios (`axios`);
    - Vite e as ferramentas de desenvolvimento registradas no projeto.

2. Obtenha as chaves:
    - API do Geopify (necessário criar conta no site da Geoapify, criar um projeto no painel para ter acesso a chave de API obtida, em seguida copie-a e guarde localmente);
    - PrimeUI (crie uma conta gratuita, preencha os requisitos para obter a chave da licença Community, em seguida copie-a e guarde localmente).

3. Abra `src/utils/chaves.js` e substitua os valores `COLOQUE_SUA_CHAVE_AQUI` pelas respectivas chaves obtidas no passo 2.

4. Inicie a aplicação utilizando `npm run dev`.

5. Abra o endereço informado no terminal em seu navegador. O navegador irá pedir permissão para acesso à sua localização. Permita o acesso para utilizar a aplicação.