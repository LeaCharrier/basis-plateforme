class Color {
    constructor(color, isReferenced) {
        if(isReferenced) {
            this.name = color.name;
            this.palette = this.name.split('/')[0];
            this.style = color.style;
        }
        this.hex = color.hex.toLowerCase();
        this.rgb = `${color.r}, ${color.g}, ${color.b}`;
        this.data = {                                           // Specific data of the color
            totalUsed: 0,                                       // – Total number of times the color is used (Integer)
            percentUsed: 0,                                     // – Overall percentage of times the color is used (%)
            percentRefUsed: 0,                                  // – Percentage of times the color is used compared to referenced or unreferenced colors (%)
            totalAttached: 0,                                   // – Total number of times the color is used with it style (Integer)
            percentAttached: 0,                                 // – Percentage of times the color is used with it style (%)
            totalDetached: 0,                                   // – Total number of times the color is used without it style (Integer)
            percentDetached: 0,                                 // – Percentage of times the color is used without it style (%)
            types: new Object(),                                // - Types of elements on which the color is applied and the number of times it is applied (Object)
            mainTypes: []                                       // - Main type(s) of element(s) on which the color is applied (Array)
        };
    }
}

export class ColorUsage {
    constructor(colors) {
        this.colors = {
            referenced: new Object(),
            unreferenced: new Object(),
            data: {                                             // Global data
                total: 0,                                       // – Total number of colors (Integer)
                totalUsed: 0,                                   // – Total number of colors used (Integer)
                totalReferenced: Object.keys(colors).length,    // – Total number of referenced colors (Integer)
                totalReferencedUsed: 0,                         // – Total number of referenced colors used (Integer)
                percentReferenced: 0,                           // – Percentage of referenced colors (%)
                percentReferencedUsed: 0,                       // – Percentage of referenced colors used (%)
                totalUnreferenced: 0,                           // – Total number of unreferenced colors (Integer)
                totalUnreferencedUsed: 0,                       // – Total number of unreferenced colors used (Integer)
                percentUnreferenced: 0,                         // – Percentage of colors unreferenced (%)
                percentUnreferencedUsed: 0,                     // – Percentage of unreferenced colors used (%)
                mostDetached: [],                               // - Most used colors without their style (Array)
                score: 0                                        // – Score out of 100 evaluating the ratio between referenced and non-referenced colors (X/100)
                
            }                             
        };

        [...colors].forEach(color => {
            this.colors.referenced[color.hex.toLowerCase()] = new Color(color, true);
        });

    }

    update(color) {
        let hex = color.hex.toLowerCase(),
            c = null;
        
        if(this.colors.referenced[hex]) {
            // Referenced color
            c = this.colors.referenced[hex];
            this.colors.data.totalReferencedUsed += 1;
            !color.style && (c.data.totalDetached += 1);
        } else {
            // Unreferenced color
            c = this.colors.unreferenced[hex];
            !c && (c = this.colors.unreferenced[hex] = new Color(color, false));
            this.colors.data.totalUnreferencedUsed += 1;
        }

        // Increment the number of times the color is used
        c.data.totalUsed += 1;

        // Increment the total number of colors used
        this.colors.data.totalUsed += 1;

        // Increment the number of times the color is applied to this type of element
        c.data.types[color.type] ? c.data.types[color.type] += 1 : c.data.types[color.type] = 1;
    }

    calc(colors) {

        // Total number of unreferenced colors (Integer)
        colors.data.totalUnreferenced = Object.keys(colors.unreferenced).length;

        // Total number of colors (Integer)
        colors.data.total = colors.data.totalReferenced + colors.data.totalUnreferenced;

        // Percentage of colors referenced (%)
        colors.data.percentReferenced = (colors.data.totalReferenced / colors.data.total) * 100;

        // Percentage of referenced colors used (%)
        colors.data.percentReferencedUsed = (colors.data.totalReferencedUsed / colors.data.totalUsed) * 100;

        // Percentage of colors unreferenced (%)
        colors.data.percentUnreferenced = (colors.data.totalUnreferenced / colors.data.total) * 100;

        // Percentage of unreferenced colors used (%)
        colors.data.percentUnreferencedUsed = (colors.data.totalUnreferencedUsed / colors.data.totalUsed) * 100;

        // Score out of 100 evaluating the ratio between referenced and non-referenced colors (X/100)
        colors.data.score = Math.round((colors.data.percentReferenced + colors.data.percentReferencedUsed) / 2);

        // Calculate data foreach specific colors
        let colorsKeys = ['referenced', 'unreferenced'];
        [...colorsKeys].forEach(key => {
            Object.entries(colors[key]).forEach(([hex, color]) => {

                // Overall percentage of times the color is used (%)
                color.data.percentUsed = (color.data.totalUsed / colors.data.totalUsed) * 100;

                switch(key) {
                    case 'referenced':
                        // Percentage of times the color is used compared to referenced colors (%)
                        color.data.percentRefUsed = (color.data.totalUsed / colors.data.totalReferencedUsed) * 100;

                        // Total number of times the color is used with it style (Integer)
                        color.data.totalAttached = color.data.totalUsed - color.data.totalDetached;

                        // Total number of times the color is used without it style (Integer)
                        color.data.percentDetached = (color.data.totalDetached / color.data.totalUsed) * 100;

                        // Percentage of times the color is used with it style (%)
                        color.data.percentAttached = 100 - color.data.percentDetached;

                        // Push detached color to the most detached colors array
                        color.data.totalDetached > 0 && (colors.data.mostDetached.push(
                            {
                                hex: color.hex,
                                detached: color.data.percentDetached
                            }
                        ));

                        break;
                    case 'unreferenced':
                        // Percentage of times the color is used compared to unreferenced colors (%)
                        color.data.percentRefUsed = (color.data.totalUsed / colors.data.totalUnreferencedUsed) * 100;

                        // Delete useless properties
                        delete color.data.totalAttached;
                        delete color.data.percentAttached;
                        delete color.data.totalDetached;
                        delete color.data.percentDetached;
                        
                        break;    
                    default:
                        color.data.percentRefUsed =  undefined;
                        console.log(`Sorry, we are out of ${key}.`);
                }

                // Main type(s) of element(s) on which the color is applied.
                let typeUsed = 0;
                Object.entries(color.data.types).forEach(([type, used]) => {
                    if(used >= typeUsed) {
                        used > typeUsed && (color.data.mainTypes = []);
                        color.data.mainTypes.push(type);
                        typeUsed = used;
                    }
                });

                // Rearranges the types of elements to which the color is applied
                let tempTypes = color.data.types;
                color.data.types = [];
                Object.entries(tempTypes).forEach(([type, used], i) => {
                    color.data.types.push({
                        type: type,
                        used: used
                    }); 
                });

                // Order in descending order the types of elements on which the color is applied
                color.data.types.sort((a, b) => { 
                    return b.used - a.used; 
                });

            });
        });

        // Order in descending order the most detached colors
        colors.data.mostDetached.sort((a, b) => { 
            return b.detached - a.detached; 
        });

    }
}