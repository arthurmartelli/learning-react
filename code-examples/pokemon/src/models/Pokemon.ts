/**
 * Represents a Pokemon with a name and URL.
 */
export default class Pokemon {
  constructor(public name: string, public url: string) {
    this.name = name;
    this.url = url;
  }
}
