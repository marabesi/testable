export default {
  global: {
    options: 'Opciones',
  },
  menu: {
    logout: 'Salir'
  },
  achievements: {
    title: 'Logros',
    empty_list: 'Lista esta vacia',
    social_sharing: 'Has logrado una etiqueta!',
    list: [
      {
        title: 'Challenge accepted',
        description: 'Let\'s build a rocket!',
        level: 2,
        active: false
      },
      {
        title: 'Tutorial completed',
        description: 'Sum function created successfully!',
        level: 3,
        active: false
      },
      {
        title: 'Test after making code',
        level: 4,
        description: 'Do not leave everything in one function',
        active: false
      },
      {
        title: 'Unit test',
        level: 5,
        description: 'Prevents possible unwanted changes and tests small units of code as functions',
        items: [
          'Store the running code result',
          'Store expected result in a variable',
          'Compare the two results'
        ],
        active: false
      },
      {
        title: 'Unit test - All set to build the rocket!',
        level: 6,
        description: 'Sum function successfully tested!',
        active: false
      },
      {
        title: 'Unit test - Two engines running',
        level: 8,
        description: 'Successful engine multiplication, two instead of one.',
        active: false
      },
      {
        title: 'Unit test - Landing lock',
        level: 9,
        description: 'Built-in landing system, lock removed!',
        active: false
      },
      {
        title: 'Unit test - Ready and tested localization system',
        level: 12,
        description: 'Two functioning and tested GPS systems.',
        active: false
      },
    ]
  },
  level : {
    label: 'nivel'
  },
  ranking: {
    title: 'ranking',
    error: 'Something went wrong loading the ranking :(',
    table: {
      position: 'position',
      name: 'name',
      level: 'level',
    }
  },
  options: {
    language: 'idioma',
    background_animation: 'Animaciones',
    languages : {
      en: 'Ingles',
      es: 'Español',
      'pt-br': 'Portugues (Brazil)',
      ro: 'Romania'
    }
  },
  survey: {
    title: 'Encuesta'
  },
  content: {
    introduction: {
      what_is_the_first: '¿Qué es primero?',
      hello_world: '_ Hola mundo',
      open_curly_brackets: '{',
      my_name_is_buggy: 'Me llamo é Buggy',
      my_dream: 'y mi sueño es ser programador',
      two_challenges: 'pero tengo dos grandes retos',
      close_curly_brackets: '}',
    }
  }
};