const GREETINGS_TEXT = 'Rayane TOKO';
const ASCII_ART_FONT = 'Big Money-se';
const USER = 'guest';
const SERVER = 'githup';
const ROOT = '~';
let cwd = ROOT;
const DIRECTORIES = {
    education: [
        '',
        '<white>education</white>',

        '* <a href="">Specialized Technician in Digital Development Full Stack Web Option</a><yellow> with major</yellow> 2022-2024',
        '* <a href="https://www.udemy.com/certificate/UC-f4ec8a3e-4c30-4d01-932f-4f3fd144a6d4/">React JS pour Tous -</a><yellow> L\'Ultime Formation</yellow> on udemy 2004',
        '* <a href="https://drive.proton.me/urls/9Z98QVZZ5W#NvVQg0BRqK3r">ALX</a><yellow> Software Engineer Program</yellow> Cohort 22',
        ''
    ],
    projects: [
        '',
        '<white>Open Source projects</white>',
        [
            ['jQuery Terminal Portfolio',
             'https://RyanTk03.github.io',
             'Portfolio with a command line interface'
            ],
        ].map(([name, url, description = '']) => {
            return `* <a href="${url}">${name}</a> &mdash; <white>${description}</white>`;
        }),
        ''
    ].flat(),
    skills: [
        '',
        '<white>languages</white>',

        [
            'JavaScript',
            'TypeScript',
            'PHP',
            'MySQL',
            'PHP',
            'C',
            'C++',
            'Bash',
        ].map(lang => `* <yellow>${lang}</yellow>`),
        '',
        '<white>libraries</white>',
        [
            'express.js',
            'React.js',
            'Redux',
            'Next.js',
            'Laravel.js'
        ].map(lib => `* <green>${lib}</green>`),
        '',
        '<white>tools</white>',
        [
            'Figma',
            'Docker',
            'Jira + Confluence',
            'git',
            'GNU/Linux',
        ].map(lib => `* <blue>${lib}</blue>`),
        ''
    ].flat()
};
const JOKE_URL = 'https://v2.jokeapi.dev/joke/Programming';

const commands = {
    help() {
        term.echo('Available command: ' + commandsListStr)
    },
    echo(...argsList) {
        if (argsList.length > 0) {
            term.echo(argsList.join(' '));
        }
    },
    whoami() {
        this.echo("Hi 👋, my name is Rayane TOKO\n👨‍💻 Computer Scientist |\n🌌 Physicist Enthusiast 💡\nAlways exploring new technologies and seeking to\nbridge the gap between science and technology.")
    },
    mywebsite() {
        window.open("https://rayanetoko.netlify.app/", "_blank");
    },
    cd(dir = null) {
        if (dir === null || (dir === '..' && cwd !== root)) {
            cwd = ROOT;
        } else if (dir.startsWith('~/') && Object.keys(DIRECTORIES).includes(dir.substring(2))) {
            cwd = dir;
        } else if (Object.keys(DIRECTORIES).includes(dir)) {
            cwd = ROOT + '/' + dir;
        } else {
            this.error('Wrong directory');
        }
    },
    pwd() {
        term.echo(cwd);
    },
    ls(dir = null) {
        if (dir) {
            if (dir.match(/^~\/?$/)) {
                // ls ~ or ls ~/
                printDirs();
            } else if (dir.startsWith('~/')) {
                const path = dir.substring(2);
                const dirs = path.split('/');
                if (dirs.length > 1) {
                    this.error('Invalid directory');
                } else {
                    const dir = dirs[0];
                    this.echo(DIRECTORIES[dir].join('\n'));
                }
            } else if (cwd === root) {
                if (dir in DIRECTORIES) {
                    this.echo(DIRECTORIES[dir].join('\n'));
                } else {
                    this.error('Invalid directory');
                }
            } else if (dir === '..') {
                printDirs();
            } else {
                this.error('Invalid directory');
            }
        } else if (cwd === ROOT) {
            printDirs();
        } else {
            const dir = cwd.substring(2);
            this.echo(DIRECTORIES[dir].join('\n'));
        }
    },
    async joke() {
        const res = await fetch(JOKE_URL);
        const data = await res.json();
        (async () => {
            if (data.type == 'twopart') {
                const prompt = this.get_prompt();
                this.set_prompt('');
                await this.echo(`Q: ${data.setup}`, {
                    delay: 50,
                    typing: true
                });
                await this.echo(`A: ${data.delivery}`, {
                    delay: 50,
                    typing: true
                });
                this.set_prompt(prompt);
            } else if (data.type === 'single') {
                await this.echo(data.joke, {
                    delay: 50,
                    typing: true
                });
            }
        })();
    },
    credits() {
        return [
            '',
            '<white>Used libraries:</white>',
            '* <a href="https://terminal.jcubic.pl" target="_blank">jQuery Terminal</a>',
            '* <a href="https://github.com/patorjk/figlet.js/" target="_blank">Figlet.js</a>',
            '* <a href="https://github.com/jcubic/isomorphic-lolcat" target="_blank">Isomorphic Lolcat</a>',
            '* <a href="https://jokeapi.dev/" target="_blank">Joke API</a>',
            ''
        ].join('\n');
    },
};

const commandsList = Object.keys(commands).map(cmd => `<white class="command">${cmd}</white>`);
commandsList.push('<white class="command">clear</white>');
const commandsListStr = commandsList.join(', ');

function render(asciiArtText) {
    return figlet.textSync(asciiArtText, {
        font: ASCII_ART_FONT,
        width: term.cols(),
        whitespaceBreak: true
    })
}

function rainbow(string, seed) {
    return lolcat.rainbow(function(char, color) {
        char = $.terminal.escape_brackets(char);
        return `[[;${hex(color)};]${char}]`;
    }, string, seed).join('\n');
}

function hex(color) {
    return '#' + [color.red, color.green, color.blue].map(n => {
        return n.toString(16).padStart(2, '0');
    }).join('');
}

function printDirs() {
    term.echo(Object.keys(DIRECTORIES).map(dir => {
        return `<blue class="directory">${dir}</blue>`;
    }).join('\n'));
}

function ready() {
    const seed = Math.floor(Math.random() * (256 + 1));

    term
    .echo(() => `${rainbow(render(GREETINGS_TEXT), seed)}\n\n`, {ansi: true})
    .echo('<white>WELCOME TO MY TERMINAL PORTFOLIO</white>')
    .echo('Available command: \n\t' + commandsListStr)
    .resume();
}

figlet.defaults({fontPath: 'https://unpkg.com/figlet/fonts/'});
figlet.preloadFonts([ASCII_ART_FONT], ready);

const re = new RegExp(`^\s*(${Object.keys(commands).join('|')})(\s?.*)`);

$.terminal.new_formatter([re, function(_, command, args) {
    return `<white class="command--typing">${command}</white><green>${args}</green>`;
}]);

$.terminal.xml_formatter.tags.green = (attrs) => {
    return `[[;#44D544;]`;
};

$.terminal.xml_formatter.tags.blue = (attrs) => {
    return `[[;#55F;;${attrs.class}]`;
};

const term = $("#term-container").terminal(commands, {
    greetings: false,
    checkArity: false,
    exit: false,
    completion(string) {
        const cmd = this.get_command();
        const { name, rest } = $.terminal.parse_command(cmd);
        if (['cd', 'ls'].includes(name)) {
            if (rest.startsWith('~/')) {
                return Object.keys(DIRECTORIES).map(dir => `~/${dir}`);
            }
            if (cwd === ROOT) {
                return Object.keys(DIRECTORIES);
            }
        }
        return Object.keys(commands);
    },
    prompt() {
        return `<green>${USER}@${SERVER}</green>:<blue>${cwd}</blue>$ `;
    }
});

term.pause();

term.on('click', '.command', function() {
    const cmd = $(this).text();
    term.exec(cmd);
});

term.on('click', '.directory', function() {
    const dir = $(this).text();
    term.exec(`cd ~/${dir}`);
});
