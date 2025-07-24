import { faker } from "@faker-js/faker";

class RandomFaker {
  private unsplashImages: string[] = [
    "https://images.unsplash.com/photo-1753097916730-4d32f369bbaa?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1515405295579-ba7b45403062?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1555705823-f76775b19a7f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1608890457730-84fc54828b50?q=80&w=840&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://static.vecteezy.com/system/resources/previews/011/731/227/large_2x/sad-boy-anime-boy-illustration-for-wallpaper-minimalist-boy-free-vector.jpg",
    "https://images.unsplash.com/photo-1555705404-03e0af80d5ba?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1716045168176-15d310a01dc0?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];
private phrases = [
  () => `A ${faker.word.adjective({ strategy: 'shortest' })} ${faker.word.noun()}`,              // A Quiet Storm
  () => `${faker.word.adjective({ strategy: 'shortest' })} ${faker.word.noun()}`,               // Lonely Sunset
  () => `${faker.word.adjective()} whispers in the ${faker.word.noun()}`,                    // Silent whispers in the night
  () => `${faker.word.adverb()} fading ${faker.word.noun()}`,                               // Slowly fading memories
  () => `Between ${faker.word.noun()} and ${faker.word.noun()}`,                            // Between shadows and light
  () => `Lost in ${faker.word.noun()}`,                                                    // Lost in dreams
  () => `Echoes of ${faker.word.noun()}`,                                                  // Echoes of silence
  () => `Under the ${faker.word.adjective()} ${faker.word.noun()}`,                         // Under the fading sky
  () => `${faker.word.noun()} in ${faker.word.noun()}`,                                    // Heart in motion
  () => `When ${faker.word.noun()} meets ${faker.word.noun()}`,                            // When sorrow meets hope
  () => `Chasing ${faker.word.noun()}`,                                                   // Chasing shadows
  () => `Moments of ${faker.word.noun()}`,                                                // Moments of clarity
  () => `Between ${faker.word.adjective()} thoughts`,                                     // Between silent thoughts
  () => `Dancing with ${faker.word.noun()}`,                                              // Dancing with memories
  () => `Fading into ${faker.word.noun()}`,                                               // Fading into dreams
];

  private lastIndex: number = -1;

  /**
   * generate image form unsplash
   */
  public generateImage(): string {
    if (this.unsplashImages.length === 0) return "";

    if (this.unsplashImages.length === 1) return this.unsplashImages[0];

    let randomIndex = this.lastIndex;
    while (randomIndex === this.lastIndex) {
      randomIndex = Math.floor(Math.random() * this.unsplashImages.length);
    }

    this.lastIndex = randomIndex;
    return this.unsplashImages[randomIndex];
  }

  public generateWordPhrase(): string {
    const randomFormatFn = faker.helpers.arrayElement(this.phrases);
    return randomFormatFn();
  }
}

const random = new RandomFaker();

export default random;
