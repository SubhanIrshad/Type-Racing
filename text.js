// Contains all texts racetracks can use
function text() {
    this.text = [
        "Buffalo buffalo Buffalo buffalo buffalo buffalo Buffalo buffalo.\" is a grammatically correct sentence in American English, often presented as an example of how homonyms and homophones can be used to create complicated linguistic constructs through lexical ambiguity. It has been discussed in literature in various forms since 1967, when it appeared in Dmitri Borgmann's Beyond Language: Adventures in Word and Thought.\n" +
        "\n",
        "Coconuts falling from their respective trees that strike individuals can cause serious injuries to the back, shoulder and more fatally, the head.[1] Following a 1984 study on \"Injuries Due to Falling Coconuts\", exaggerated claims spread concerning the number of deaths by falling coconuts. Falling coconuts, according to urban legend, kill a few people a year. This legend gained momentum after the 2002 work of a noted expert on shark attacks was characterized as saying that falling coconuts kill 150 people worldwide each year.[2] The claim has often been compared with the number of shark-caused deaths per year, which is approximately five.",
        "The Year 10,000 problem (also known as the Y10K problem or the deca-millennium bug)[1] is the class of all potential time formatting and storage bugs that would emerge when the need to express years with five digits arises. The problem can have discernible effects today, but is also sometimes mentioned for humorous effect as in RFC 2550",
        "Aside from novelty and amusement, calculator spelling has limited utility. The popularity of pagers in the 1990s gave rise to a form of leetspeak called pagerspeak.[3] Students, in particular, experimented with calculators to discover new words.\n" +
        "\n" +
        "English\n" +
        "The 'original' attributed example of calculator spelling, which dates from the 1970s,[4] is 5318008, which when turned over spells \"BOOBIES\". Another early example of calculator spelling offered the sequence 0.7734, which becomes \"hELLO\".[5] Other words possible with the traditional \"BEghILOSZ\" set include \"LOOSE\", \"ShELL\", \"BEIgE\", \"gOBBLE\", \"gOOgLE\", and very many others. Two of the longest, at 11 letters, are \"hILLBILLIES\" and \"SLEIghBELLS\" (these require 12-digit displays, such as those used in adding machines). Hip hop slang applications include the sequence 3722145 which spells \"ShIZZLE\".",
        "The Emu War, also known as the Great Emu War,[1] was a nuisance wildlife management military operation undertaken in Australia over the latter part of 1932 to address public concern over the number of emus said to be running amok in the Campion district of Western Australia. The unsuccessful attempts to curb the population of emus, a large flightless bird indigenous to Australia, employed soldiers armed with Lewis guns—leading the media to adopt the name \"Emu War\" when referring to the incident. While a number of the birds were killed, the emu population persisted and continued to cause crop destruction.",
        "Gucci gang, Gucci gang, Gucci gang (Gucci gang) Gucci gang, Gucci gang, Gucci gang, Gucci gang (Gucci gang) Gucci gang, Gucci gang, Gucci gang (Gucci gang) Spend three racks on a new chain (huh?)"
    ];
}

// Returns a random text from collection
text.prototype.getRandomText = function() {
    var index = Math.floor(Math.random() * this.text.length);
    return this.text[index];
}

module.exports = text;

