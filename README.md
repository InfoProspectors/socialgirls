# SocialGirls

SocialGirls is a web scraping tool that allows you to crawl and download images from various social media platforms.

## Table of Contents
- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

SocialGirls is built with Deno, a secure runtime for JavaScript and TypeScript. It uses web scraping techniques to fetch web page content, extract images and text, and download the images to your local machine.

## Installation

To use SocialGirls, you need to have Deno installed on your system. You can install Deno by following the instructions in the [Deno documentation](https://deno.land/#installation).

Once Deno is installed, you can clone the SocialGirls repository:

```bash
git clone https://github.com/InfoProspectors/socialgirls.git
```

## Usage

1. Navigate to the project directory:

```bash
cd socialgirls
```

2. Install the project dependencies:

```deno cache --unstable --lock=lock.json --lock-write mod.ts
```


3. Run the main script:

```bash
deno run --allow-net --allow-read --allow-write ./main.ts
```

The script will crawl the specified URLs, extract images and text, and download the images to the `data/image` directory.

You can customize the URLs to crawl by modifying the `urls` array in the `main.ts` file.

## Contributing

Contributions are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue on the [GitHub repository](https://github.com/InfoProspectors/socialgirls/issues) or submit a pull request.

Before contributing, please make sure to read the [Contributing Guidelines](CONTRIBUTING.md) of this project.

## License

This project is licensed under the [MIT License](LICENSE).
