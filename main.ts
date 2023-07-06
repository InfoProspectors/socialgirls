// @ts-nocheck
import { DOMParser } from 'https://deno.land/x/deno_dom/deno-dom-wasm.ts';
import { join, parse } from 'https://deno.land/std/path/mod.ts';
import { ensureDirSync } from 'https://deno.land/std/fs/mod.ts';
import { basename } from 'https://deno.land/std/path/mod.ts';

// 获取网页内容
async function fetchPage(url) {
    const response = await fetch(url);
    const html = await response.text();
    return html;
}

// 写入日志
async function writeLog(filePath, content) {
    try {
        const encoder = new TextEncoder();
        const data = encoder.encode(content + '\n');
        await Deno.writeFile(filePath, data, { append: true });
    } catch (error) {
        console.error(`Failed to write log to file: ${filePath}`, error);
    }
}

// 提取图片和对应文字
function extractImagesAndText(html) {
    const parser = new DOMParser();
    const document = parser.parseFromString(html, 'text/html');
    const images = document?.querySelectorAll('img');
    const results = [];

    if (images) {
        for (const image of images) {
            const src = image.getAttribute('src');
            const alt = image.getAttribute('alt');
            const text = alt || '';

            results.push({ src, text });
        }
    }

    return results;
}

// 下载图片
async function downloadImage(url, dest) {
    const sanitizedUrl = url.split('?')[0]; // 移除URL中的?以及后面的部分
    try {
        const response = await fetch(sanitizedUrl);
        const buffer = await response.arrayBuffer();
        await Deno.writeFile(dest.split('?')[0], new Uint8Array(buffer));
        console.log(`Downloaded: ${url}`);
        await writeLog('log/success.log', `Success: ${url}`);
    } catch (error) {
        console.error(`Failed to download: ${url}`, error);
        await writeLog('log/error.log', `Failed: ${url}, ${error}`);
    }
}

async function crawlAndDownload(url, dir) {
    const html = await fetchPage(url);
    const images = extractImagesAndText(html);
    ensureDirSync(dir);

    for (const image of images) {
        const { name, ext } = parse(image.src);
        const imageName = basename(name);
        const imagePath = join(dir, `${imageName}${ext}`);
        await downloadImage(image.src, imagePath);
    }
}

async function main() {
    const urls = [
        'https://socialgirls.im/',
        'https://socialgirls.im/weibo/',
        'https://socialgirls.im/ins/',
        'https://socialgirls.im/twitter/',
        'https://socialgirls.im/pinterest/',
        'https://socialgirls.im/pinterest/721279765260229901/?f=h',
        'https://socialgirls.im/pinterest/721279765260240236/?f=h',
        'https://socialgirls.im/pinterest/721279765260454293/?f=h',
        'https://socialgirls.im/misc/'
    ];

    for (const url of urls) {
        const dir = `data/image/${new URL(url).pathname}`;
        try {
            await crawlAndDownload(url, dir);
            console.log(`Finished crawling and downloading: ${url}`);
        } catch (error) {
            console.error(`Failed to crawl and download: ${url}`, error);
        }
    }
}
main();
