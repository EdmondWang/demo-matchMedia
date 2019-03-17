const isMobile = !myMatchMedia("desktop") && ("ontouchstart" in window || myMatchMedia("mobile"));

if (!isMobile) {
    console.log('Apply desktop behaviour');
} else {
    console.log('Apply touch/mobile behaviour');
}