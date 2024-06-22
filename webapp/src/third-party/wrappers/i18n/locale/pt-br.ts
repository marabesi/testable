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
  intro: {
    exit: 'Sair',
    next: 'Próximo',
    previous: 'Anterior',
    ready: 'Estou pronto!',
  },
  content: {
    introduction: {
      first_step: {
        what_is_the_first: 'Qual é o primeiro?',
        hello_world: '_ Hello world',
        open_curly_brackets: '{',
        my_name_is_buggy: 'Meu nome é Buggy',
        my_dream: 'e meu sonho é ser programador',
        two_challenges: 'mas tenho dois grandes desafios',
        close_curly_brackets: '}',
      },
      second_step: {
        and_the_second: 'E o segundo?',
        the_first_you_know: '_ O primeiro você sabe bem...',
        open_curly_brackets: '{',
        programming_is_not_easy: '... programar não é NADA fácil!',
        close_curly_brackets: '}',
      },
      third_step: {
        a_bug: 'Um bug?',
        and_the_second: '_ E o segundo ...',
        three_dots: '. . .',
        i_am_a_bug: '_Sou um bug!',
      },
      forth_step: {
        which_friend: 'Que amigo?',
        no_credibility: 'Não temos credibilidade',
        no_credibility_part_2: 'pelo simples fato de não sermos bem vistos nessa área...',
        no_credibility_part_3: 'Ao contrário do meu amigo...',
      }
    }
  }
};
