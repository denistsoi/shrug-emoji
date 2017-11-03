#!/usr/bin/env node
const clip = require('cliparoo');
const emojis = require("emojilib");
const fuzzy = require('fuzzy');

const inquirer = require('inquirer');
inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));

// use fuzzy-search to filter emojis
function searchEmoji(answers, input) {
	input = input || '';
	return new Promise(resolve => {
		setTimeout(() => {
			let result = fuzzy.filter(input, require('emojilib').ordered);
			resolve(result.map(el => el.original ));
		}, 100)
	})
}

inquirer.prompt([{ 
	type: 'autocomplete',
	name: 'emoji',
	message: 'type an emoji',
	source: searchEmoji
}]).then(function(answers) {
	let choice = answers.emoji;
	let emoji = emojis.lib[choice.toString()].char;

	// return shrugged-emoji
	return `¯\\_\( ${emoji} \)_/¯`;
}).then(shrug => {
	// copy to clipboard

	clip(shrug);
	console.log(`${shrug} has been copied to your clipboard`);
})