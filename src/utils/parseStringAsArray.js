export default function parseStringAsArray(string, parsingOption) {
    return string.split(parsingOption).map((item) => item.trim());
}