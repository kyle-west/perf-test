Confession: I borrowed/modified a lot of the code from: https://michaljanaszek.com/blog/test-website-performance-with-puppeteer/

Install:

```sh
git clone https://github.com/kyle-west/perf-tester;
cd perf-tester;
npm link; # <--- link globally so that you have access to the `perf` command
```

Usage:

```sh
perf <url> [<number of trials>]
```

`perf https://github.com/kyle-west 10` will test 10 speed trials of loading github.com on Chrome and FireFox