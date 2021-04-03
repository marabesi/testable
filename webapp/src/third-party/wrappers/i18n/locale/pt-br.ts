export default {
  global: {
    options: 'Opções',
    curly_braces_open: '{',
    underscore_and_curly_braces_open: '_{',
    curly_braces_close: '}',
    underscore_and_braces_open: '_[',
    braces_close: ']',
    three_dots: '. . .',
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
  },
  content: {
    introduction: {
      action_which_is_the_first: 'Qual é o primeiro?',
      hello_world: '_ Hello world',
      my_name: 'Meu nome é Buggy',
      want_to_be_a_programmer: 'e meu sonho é ser programador',
      two_challenges: 'mas tenho dois grandes desafios',
      action_second_challenge: 'E o segundo?',
      the_first: '_ O primeiro você sabe bem...',
      not_easy_to_program: '... programar não é NADA fácil!',
      action_a_bug: 'Um bug?',
      the_second_challenge: '_ E o segundo ...',
      i_am_a_bug: '_Sou um bug!',
      action_which_friend: 'Que amigo?',
      no_credibility: 'Não temos credibilidade',
      no_credibility_in_the_field: 'pelo simples fato de não sermos bem vistos nessa área...',
      as_my_friend: 'Ao contrário do meu amigo...',
      action_nazah: 'Nazah? A que faz foguetes?',
      credit_because_workaholic: 'Que é um alien, pois são super valorizados porque muitos trabalham',
      the_famous_nazah: 'para aquelas empresa famosa, a Nazah.',
      pffff: '. . . pfff',
      action_rockets: 'Foguetes?',
      no_unit_tests: 'Eu não perco tempo com testes unitários!',
      much_faster: 'Por isso sempre faço as coisas mais rápidas!',
      a_few_rockets: 'Até já programei alguns foguetes por aí.',
      action_i_am_in: 'Estou dentro!',
      why_dont_we_build_a_rocket: 'Por que não construímos um foguete',
      send_to_space: 'e mandamos pro espaço?',
    }
  }
};