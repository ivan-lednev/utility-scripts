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
const { current: startBranch, isClean } = await git.status()
const stashNeeded = !isClean()

if (stashNeeded) {
  await git.stash(["save", "stash before auto-rebasing branches"])
}

async function rebaseOnMain(branch) {
  await git.checkout(branch)
  await git.pull()
  await git.pull("origin", "main", { "--rebase": true })
  await git.push(["--force"])
}

for (const branch of branches) {
  await rebaseOnMain(branch)
}

await git.checkout(startBranch)

if (stashNeeded) {
  await git.stash(["pop"])
}
