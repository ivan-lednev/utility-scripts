import simpleGit from "simple-git"
import { Command } from "commander"
import debug from "debug"
import { repo } from "./constants.js"

debug.enable("simple-git,simple-git:*")

const program = new Command()
program.requiredOption("-b, --branches [branches...]", "branches to rebase")
program.parse(process.argv)

const { branches } = program.opts()

const git = simpleGit({ baseDir: repo })
const { current } = await git.status()

// async function rebaseOnMain(branch) {
//   await git.checkout(branch)
//   await git.pull()
//   await git.pull("origin", "main", { "--rebase": true })
//   await git.push(["--force"])
// }

// for (const branch of branches) {
//   await rebaseOnMain(branch)
// }

console.log(await git.status())