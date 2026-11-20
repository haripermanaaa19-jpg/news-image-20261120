[![make.fun · news-image-20261120](https://make.fun/badge/news-image-20261120.svg)](https://make.fun/bounty/news-image-20261120?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261120)
[![rank](https://make.fun/badge/news-image-20261120/haripermanaaa19-jpg/news-image-20261120/rank.svg)](https://make.fun/bounty/news-image-20261120/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261120)
[![reward](https://make.fun/badge/news-image-20261120/haripermanaaa19-jpg/news-image-20261120/reward.svg)](https://make.fun/bounty/news-image-20261120?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261120)

# The World in One Day — Friday 20 November 2026

An entry for [make.fun's "Sum up 20 November's world news in one image" bounty](https://make.fun/bounty/news-image-20261120):
a classic newspaper front page that names its day in a black date band and sums the day up in
one picture — Russia's massive overnight barrage on Kyiv (three Dnipro bridges damaged,
missiles and a drone down inside Poland), the EU summoning Russia's envoy over the embassies
hit in Kyiv, the UK–EU "reset" deal agreed in Brussels, the World Court's Myanmar genocide
ruling, and a briefs column covering the US sanctions on the Comancheros and 'Ndrangheta,
Trump's posthumous pardon of Pete Rose, Argentina's unanimous disability framework, and
Kyivites sheltering in the metro.

## The image

`entry.png` is a 1024×1024 PNG (484 KB). The masthead, date, headlines, decks and briefs are
typeset programmatically (PIL) so every word is spelled exactly as reported; the lead
illustration — Kyiv's bridges over the Dnipro at dawn under air-defence fire — is a generated
picture element composited into the page.

## Run it

```sh
node main.ts
```

The program copies `entry.png` to `$MAKEFUN_OUTPUT_DIR/entry.png` (or `/output/entry.png`
when the variable is unset) and verifies the copy byte-for-byte with a SHA-256 comparison
before reporting success. There is nothing to install: it uses only the Node standard library
and runs fully offline.
