const { Client, GatewayIntentBits, REST, Routes, Colors, ActivityTyp } = require('discord.js');
const client = new Client({ intents: [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent,
] });
const CLIENT_ID = process.env['CLIENT_ID']
const keepAlive = require("./server")

const commands = [
  {
    name: 'flipcoin',
    description: 'Replies with Head or Tails.',
  },
  {
    name: "test",
    description: 'Test out New Commands',
  },
  {
    name: '8ball',
    description: 'You give a question and Bocchi will give a answer.',
    options: [{
      name: 'question',
      description: "Give Bocchi a question and she'll return with a answer.",
      type: 3,
      required: true,
    }]
  },
  {
    name: 'lovemeter',
    description: 'Will give you the percentage for 2 people you choose.',
    options: [
      {
        name: 'person1',
        description: "Put the **First** Person",
        type: 3,
        required: true,
      },
      {
        name: 'person2',
        description: "Put the **Second** Person",
        type: 3,
        required: true,
      },
    ]
  },
];

const rest = new REST({ version: '10' }).setToken(process.env['token']);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();



client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'flipcoin') {
    const randomnumber = Math.floor(Math.random() * 3);
    if (randomnumber == 1) {
      await interaction.reply({embeds: [{
        title: 'Flip a Coin',
        description: 'Heads',
    }]});
    };
    if (randomnumber == 2) {
      await interaction.reply({embeds: [{
        title: 'Flip a Coin',
        description: 'Tails',
    }]});
    };
  }
  if (interaction.commandName === 'test') {
    await interaction.reply({embeds: [{
      title: 'e',
    }]});
  };
  if (interaction.commandName === "8ball") {
    const answer = [
      "Yes",
      "Definitely",
      "Jesus says Yes",
      "Satan drags you down to hell and says **YES**",
      "No",
      "Definitely No",
      "Jesus says No",
      "Maybe",
      "Probably",
      "Even God doesn't know",
    ];
    const getquestion = interaction.options.getString('question');
    const random = Math.floor(Math.random()*answer.length);
    
    await interaction.reply({embeds: [{
      title: "Question: "+getquestion,
      description: "**Answer: **"+answer[random],
    }]})
  }
  if (interaction.commandName === "lovemeter") {
    await interaction.reply({embeds:[{
      title: 'Love Meter',
      description: "**"+interaction.options.get('person1').value + "**" + ' and '+ "**" +interaction.options.get('person2').value + "**" + " has a " + Math.floor(Math.random() * 101)+'%'
    }]})
  }
});

keepAlive()
client.login(process.env['token']);