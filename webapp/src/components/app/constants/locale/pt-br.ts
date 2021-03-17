export default {
  global: {
    options: 'Opções'
  },
  menu: {
    logout: 'sair'
  },
  achievements: {
    title: 'Conquistas',
    empty_list: 'Você não possui nenhuma conquista até o momento',
    social_sharing: 'Conquista desbloqueada!',
    list: [
      {
        title: 'Desafio aceito',
        description: 'Vamos construir um foguete!',
        level: 2,
        active: false
      },
      {
        title: 'Tutorial completo',
        description: 'Função de soma criada com sucesso!',
        level: 3,
        active: false
      },
      {
        title: 'Testar depois de fazer o código',
        level: 4,
        description: 'Não deixe tudo em uma única função',
        active: false
      },
      {
        title: 'Teste unitário',
        level: 5,
        description: 'Previne possíveis mudanças indesejadas e testa pequenas unidades de código como as funções',
        items: [
          'Armazenar resultado do código em execucação',
          'Armazenar resultado esperado em uma variável',
          'Comparar os dois resultados'
        ],
        active: false
      },
      {
        title: 'Teste unitário - Tudo preparado para construir o foguete!',
        level: 6,
        description: 'Função de soma testada com sucesso!',
        active: false
      },
      {
        title: 'Teste unitário - Dois motores funcionando',
        level: 8,
        description: 'Multiplicação de motores efetuada com sucesso, dois ao invés de um.',
        active: false
      },
      {
        title: 'Teste unitário - Trava de pouso',
        level: 9,
        description: 'Sistema de aterrissagem construído, trava removida!',
        active: false
      },
      {
        title: 'Teste unitário - Sistema de localização pronto e testado',
        level: 12,
        description: 'Dois sistemas de GPS funcionando e testados.',
        active: false
      },
    ]
  },
  level : {
    label: 'nível'
  },
  ranking: {
    title: 'ranking',
    error: 'Ocorreu um erro ao carregar o ranking :(',
    table: {
      position: 'posição',
      name: 'nome',
      level: 'nível',
    }
  },
  options: {
    language: 'Idioma',
    background_animation: 'Animação de fundo',
    languages : {
      en: 'Inglês',
      es: 'Espanhol',
      'pt-br': 'Português (Brasil)',
      ro: 'Romania'
    },
  },
  survey: {
    title: 'Questionário'
  }
};