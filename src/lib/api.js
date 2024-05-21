let pins = [
    { id: 1, image: 'https://picsum.photos/300/300', title: 'Beautiful Landscape', tags: ['landscape', 'dog', 'nature'], likes: 0, description: 'A beautiful view of a landscape.' },
    { id: 2, image: 'https://picsum.photos/400/400', title: 'City View', tags: ['city', 'urban'], likes: 0, description: 'A stunning view of the city skyline.' },
    { id: 3, image: 'https://picsum.photos/200/500', title: 'Mountain Peak', tags: ['mountain', 'hiking'], likes: 0, description: 'The peak of a majestic mountain.' },
    { id: 4, image: 'https://picsum.photos/200/400', title: 'Forest Trail', tags: ['forest', 'trail'], likes: 0, description: 'A peaceful trail through the forest.' },
    { id: 5, image: 'https://picsum.photos/400/500', title: 'Sunset Over Beach', tags: ['beach', 'sunset'], likes: 0, description: 'A beautiful sunset over the beach.' },
    { id: 6, image: 'https://picsum.photos/200/300', title: 'Desert Dunes', tags: ['desert', 'dunes'], likes: 0, description: 'Rolling dunes in the desert.' },
    { id: 7, image: 'https://picsum.photos/200/350', title: 'Snowy Landscape', tags: ['snow', 'winter'], likes: 0, description: 'A snowy winter landscape.' },
    { id: 8, image: 'https://picsum.photos/200/450', title: 'Autumn Leaves', tags: ['autumn', 'leaves'], likes: 0, description: 'Beautiful autumn leaves on the ground.' },
    { id: 9, image: 'https://picsum.photos/200/550', title: 'Ocean Waves', tags: ['ocean', 'waves'], likes: 0, description: 'Powerful ocean waves crashing.' },
    { id: 10, image: 'https://picsum.photos/200/600', title: 'Canyon View', tags: ['canyon', 'rocks'], likes: 0, description: 'A breathtaking view of a canyon.' },
    { id: 11, image: 'https://picsum.photos/200/300', title: 'Rainforest', tags: ['rainforest', 'trees'], likes: 0, description: 'Lush greenery in the rainforest.' },
    { id: 12, image: 'https://picsum.photos/200/400', title: 'Waterfall', tags: ['waterfall', 'river'], likes: 0, description: 'A stunning waterfall cascading down.' },
    { id: 13, image: 'https://picsum.photos/200/500', title: 'Lake View', tags: ['lake', 'reflection'], likes: 0, description: 'A serene lake reflecting the surroundings.' },
    { id: 14, image: 'https://picsum.photos/200/450', title: 'Meadow', tags: ['meadow', 'flowers'], likes: 0, description: 'A beautiful meadow filled with flowers.' },
    { id: 15, image: 'https://picsum.photos/200/350', title: 'River', tags: ['river', 'stream'], likes: 0, description: 'A calm river flowing through the forest.' },
    { id: 16, image: 'https://picsum.photos/200/400', title: 'Rocky Shore', tags: ['shore', 'rocks'], likes: 0, description: 'Rocks lining the shore of a beach.' },
    { id: 17, image: 'https://picsum.photos/200/450', title: 'Lavender Field', tags: ['lavender', 'field'], likes: 0, description: 'A field of blooming lavender.' },
    { id: 18, image: 'https://picsum.photos/200/500', title: 'Countryside', tags: ['countryside', 'fields'], likes: 0, description: 'Rolling fields in the countryside.' },
    { id: 19, image: 'https://picsum.photos/200/600', title: 'Bamboo Forest', tags: ['bamboo', 'forest'], likes: 0, description: 'A dense bamboo forest.' },
    { id: 20, image: 'https://picsum.photos/200/300', title: 'Cherry Blossoms', tags: ['cherry', 'blossoms'], likes: 0, description: 'Beautiful cherry blossoms in spring.' },
  ];
  
  
  export function fetchPins() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(pins), 100);
    });
  }
  
  export function fetchPin(pinId) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(pins.find(p => p.id === parseInt(pinId))), 100);
    });
  }
  
  export function uploadPin(data) {
    return new Promise((resolve) => {
      const newPin = { id: pins.length + 1, ...data, likes: 0, resolution: 'Unknown', metadata: 'Unknown' };
      pins.push(newPin);
      setTimeout(() => resolve(newPin), 100);
    });
  }
  
  export function likePin(pinId) {
    return new Promise((resolve) => {
      const pin = pins.find(p => p.id === parseInt(pinId));
      pin.likes += 1;
      setTimeout(() => resolve(pin), 100);
    });
  }
  