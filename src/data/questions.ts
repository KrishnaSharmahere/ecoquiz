import { Question, Topic } from '../types';

export const QUESTIONS_DATA: Question[] = [
  // ==========================================
  // TOPIC 1: WASTE (11 questions)
  // ==========================================
  {
    id: 'wst-01',
    topic: 'Waste',
    difficulty: 'Easy',
    question: 'How much less energy does recycling aluminium consume compared to producing primary aluminium from raw bauxite ore?',
    options: ['About 25%', 'About 50%', 'About 75%', 'About 95%'],
    correctIndex: 3,
    explanation: 'Recycling aluminium saves about 95% of the energy required to smelt new aluminium from raw bauxite ore, making metal recycling among the most energy-conserving industrial loops.',
    source: 'US Department of Energy',
    tag: 'Materials & Recycling'
  },
  {
    id: 'wst-02',
    topic: 'Waste',
    difficulty: 'Easy',
    question: 'Under India\'s E-Waste (Management) Rules, 2022, what foundational principle legally obligates producers to manage end-of-life electronics?',
    options: ['Linear Resource Model', 'Extended Producer Responsibility (EPR)', 'Voluntary Takeback Directive', 'Point-of-Sale Disposal Fee'],
    correctIndex: 1,
    explanation: 'India\'s E-Waste (Management) Rules, 2022 mandate Extended Producer Responsibility (EPR), requiring manufacturers, refurbishers, and recyclers to meet registered collection and recycling targets.',
    source: 'E-Waste (Management) Rules, 2022',
    tag: 'E-Waste Policy'
  },
  {
    id: 'wst-03',
    topic: 'Waste',
    difficulty: 'Medium',
    question: 'Which toxic substance represents the primary hazardous component in older cathode ray tube (CRT) electronic waste?',
    options: ['Lead oxide glass', 'Elemental sulfur', 'Sodium bicarbonate', 'Pure titanium'],
    correctIndex: 0,
    explanation: 'Cathode ray tubes contain substantial quantities of lead oxide (often 1.5 to 3 kg per monitor) to shield against X-rays, demanding specialised hazardous recycling under formal e-waste frameworks.',
    source: 'E-Waste (Management) Rules, 2022',
    tag: 'Hazardous Waste'
  },
  {
    id: 'wst-04',
    topic: 'Waste',
    difficulty: 'Medium',
    question: 'What is the estimated degradation timeline for a conventional petroleum-based plastic bottle in a typical landfill?',
    options: ['10 to 20 years', '50 to 80 years', 'Up to 450 years or more', 'Instant mineralisation'],
    correctIndex: 2,
    explanation: 'Petroleum-based plastics like PET resist natural biodegradation, undergoing slow photodegradation into persistent microplastics that can endure for up to 450 years or more.',
    source: 'US EPA Waste Characterization Studies',
    tag: 'Plastics & Marine Litter'
  },
  {
    id: 'wst-05',
    topic: 'Waste',
    difficulty: 'Hard',
    question: 'In aerobic municipal composting, what is the optimal carbon-to-nitrogen (C:N) ratio recommended for rapid, odor-free decomposition?',
    options: ['5:1 to 10:1', '25:1 to 30:1', '80:1 to 100:1', '150:1 to 200:1'],
    correctIndex: 1,
    explanation: 'An initial C:N ratio of about 25:1 to 30:1 delivers the ideal balance between microbial energy and cellular synthesis, avoiding anaerobic odors while speeding up thermophilic composting.',
    source: 'US EPA Organics Management Guidelines',
    tag: 'Composting & Organics'
  },
  {
    id: 'wst-06',
    topic: 'Waste',
    difficulty: 'Hard',
    question: 'Under India\'s E-Waste (Management) Rules, 2022, which statutory entity is responsible for granting EPR registrations and auditing target fulfilment?',
    options: ['Central Pollution Control Board (CPCB)', 'Bureau of Indian Standards (BIS)', 'NITI Aayog Ecological Cell', 'District Consumer Forum'],
    correctIndex: 0,
    explanation: 'The Central Pollution Control Board (CPCB) oversees the centralized online portal, issues EPR registrations, and verifies recycling compliance under the E-Waste (Management) Rules, 2022.',
    source: 'E-Waste (Management) Rules, 2022',
    tag: 'Environmental Governance'
  },
  {
    id: 'wst-07',
    topic: 'Waste',
    difficulty: 'Easy',
    question: 'Which tier of the waste management hierarchy consistently delivers the highest greenhouse gas abatement benefit?',
    options: ['Landfill gas capture', 'Waste-to-energy incineration', 'Source reduction and reuse', 'Downcycled shredding'],
    correctIndex: 2,
    explanation: 'Preventing waste at the source avoids all upstream emissions from extraction, manufacturing, and transport, ranking as the top tier of the waste hierarchy.',
    source: 'US EPA Waste Hierarchy & IPCC',
    tag: 'Circular Economy'
  },
  {
    id: 'wst-08',
    topic: 'Waste',
    difficulty: 'Medium',
    question: 'How many times can standard cellulose paper fibers realistically be recycled before the fibers become too short for papermaking?',
    options: ['Only once', '5 to 7 times', 'Approximately 50 times', 'Infinitely without loss'],
    correctIndex: 1,
    explanation: 'Each time paper is pulped and recycled, its cellulose fibers shorten. After 5 to 7 cycles, the fibers become too short to form strong paper and must be blended with virgin fiber.',
    source: 'US EPA Sustainable Materials Management',
    tag: 'Fiber Recycling'
  },
  {
    id: 'wst-09',
    topic: 'Waste',
    difficulty: 'Hard',
    question: 'What potent greenhouse gas is primarily emitted during the uncontrolled anaerobic decomposition of organic waste buried in sanitary landfills?',
    options: ['Sulfur hexafluoride (SF6)', 'Methane (CH4)', 'Nitrous oxide (N2O)', 'Ozone (O3)'],
    correctIndex: 1,
    explanation: 'When organic matter decomposes without oxygen in landfills, methanogenic microorganisms produce landfill gas, consisting of roughly 50% methane (CH4) and 50% carbon dioxide (CO2).',
    source: 'IPCC',
    tag: 'Landfill Emissions'
  },
  {
    id: 'wst-10',
    topic: 'Waste',
    difficulty: 'Medium',
    question: 'Which emerging clean-tech waste category was explicitly added under Chapter V of India\'s E-Waste (Management) Rules, 2022?',
    options: ['Nuclear fuel rods', 'Solar photo-voltaic modules and panels', 'Coal ash slag', 'Medical syringes'],
    correctIndex: 1,
    explanation: 'Chapter V of India\'s E-Waste (Management) Rules, 2022 explicitly mandates the safe handling, inventory tracking, and recycling of solar photo-voltaic modules, panels, and cells.',
    source: 'E-Waste (Management) Rules, 2022',
    tag: 'Solar E-Waste'
  },
  {
    id: 'wst-11',
    topic: 'Waste',
    difficulty: 'Easy',
    question: 'How much energy is saved by recycling steel cans compared to producing steel from virgin iron ore?',
    options: ['About 10% to 15%', 'About 60% to 75%', 'About 5%', 'No energy is saved'],
    correctIndex: 1,
    explanation: 'Recycling steel and iron requires about 60% to 75% less energy than processing raw iron ore, while conserving virgin limestone and coking coal.',
    source: 'US EPA Sustainable Materials Management',
    tag: 'Metals Recycling'
  },

  // ==========================================
  // TOPIC 2: WATER (11 questions)
  // ==========================================
  {
    id: 'wtr-01',
    topic: 'Water',
    difficulty: 'Easy',
    question: 'According to the US EPA WaterSense program, approximately how much water can a single dripping tap waste in one year?',
    options: ['Around 500 litres', 'Around 2,000 litres', 'About 11,000 litres (more than 3,000 gallons)', 'Over 80,000 litres'],
    correctIndex: 2,
    explanation: 'A household faucet that leaks at one drip per second wastes about 11,000 litres (more than 3,000 gallons) of treated water annually, equal to over 180 showers.',
    source: 'US EPA WaterSense',
    tag: 'Household Efficiency'
  },
  {
    id: 'wtr-02',
    topic: 'Water',
    difficulty: 'Medium',
    question: 'Based on Water Footprint Network data, what is the global average virtual water footprint embedded in producing one standard cotton t-shirt (~250g)?',
    options: ['Around 120 litres', 'Around 500 litres', 'Approximately 2,700 litres', 'Over 25,000 litres'],
    correctIndex: 2,
    explanation: 'Because cotton is an intensely irrigated crop with multiple wet processing stages, producing a 250-gram cotton shirt requires an average global water footprint of about 2,700 litres.',
    source: 'Water Footprint Network',
    tag: 'Virtual Water'
  },
  {
    id: 'wtr-03',
    topic: 'Water',
    difficulty: 'Easy',
    question: 'To earn the US EPA WaterSense label, what maximum flow rate must a showerhead achieve without compromising user experience?',
    options: ['2.0 gallons per minute (approx. 7.6 L/min)', '5.0 gallons per minute', '8.5 gallons per minute', 'No flow rate restriction'],
    correctIndex: 0,
    explanation: 'US EPA WaterSense labeled showerheads must not exceed 2.0 gallons per minute (7.6 L/min), providing at least 20% water savings compared to the standard 2.5 gpm federal fixture.',
    source: 'US EPA WaterSense',
    tag: 'Fixture Standards'
  },
  {
    id: 'wtr-04',
    topic: 'Water',
    difficulty: 'Hard',
    question: 'According to the Water Footprint Network, what is the global average water footprint required to produce 1 kilogram of beef?',
    options: ['About 500 litres', 'About 2,500 litres', 'About 6,000 litres', 'About 15,400 litres'],
    correctIndex: 3,
    explanation: 'Due to feed crop cultivation over years of animal growth, producing 1 kg of bovine meat has an average global water footprint of about 15,400 litres, with the vast majority being green water.',
    source: 'Water Footprint Network',
    tag: 'Agricultural Water'
  },
  {
    id: 'wtr-05',
    topic: 'Water',
    difficulty: 'Medium',
    question: 'What is the maximum flush volume allowed for toilets certified under the US EPA WaterSense specification?',
    options: ['1.28 gallons (approx. 4.8 litres)', '2.50 gallons (approx. 9.5 litres)', '3.50 gallons (approx. 13.2 litres)', '5.00 gallons (approx. 18.9 litres)'],
    correctIndex: 0,
    explanation: 'WaterSense toilets are certified to use 1.28 gallons (4.8 litres) or less per flush, saving an average family thousands of gallons of water per year compared to older models.',
    source: 'US EPA WaterSense',
    tag: 'Plumbing Standards'
  },
  {
    id: 'wtr-06',
    topic: 'Water',
    difficulty: 'Easy',
    question: 'In which Iranian city was the intergovernmental treaty on the conservation and wise use of wetlands signed in 1971?',
    options: ['Tehran', 'Ramsar', 'Shiraz', 'Isfahan'],
    correctIndex: 1,
    explanation: 'The Convention on Wetlands of International Importance was adopted in the Caspian seaside city of Ramsar, Iran, in 1971 and came into force in 1975.',
    source: 'Ramsar Convention',
    tag: 'Wetlands Treaty'
  },
  {
    id: 'wtr-07',
    topic: 'Water',
    difficulty: 'Medium',
    question: 'Approximately what percentage of the total water on Earth is freshwater?',
    options: ['About 2.5% to 3%', 'About 15%', 'About 35%', 'About 70%'],
    correctIndex: 0,
    explanation: 'Only about 2.5% to 3% of Earth\'s total water volume is freshwater, and over two-thirds of that is locked in glaciers, ice caps, or deep groundwater.',
    source: 'US EPA WaterSense',
    tag: 'Hydrology Basics'
  },
  {
    id: 'wtr-08',
    topic: 'Water',
    difficulty: 'Hard',
    question: 'In water footprint accounting, what does the "green water" footprint quantify?',
    options: ['Treated industrial wastewater', 'Evaporation of rainwater stored in the soil by crops', 'Surface runoff captured in dams', 'Water contaminated with synthetic dyes'],
    correctIndex: 1,
    explanation: 'The green water footprint refers to the volume of rainwater consumed during the production process, primarily through crop evapotranspiration from root-zone soil moisture.',
    source: 'Water Footprint Network',
    tag: 'Water Accounting'
  },
  {
    id: 'wtr-09',
    topic: 'Water',
    difficulty: 'Hard',
    question: 'In Water Footprint Network terminology, how is the "grey water" footprint defined?',
    options: ['Household bath drainage only', 'Volume of freshwater required to assimilate pollutants to ambient quality standards', 'Saline groundwater used in oil extraction', 'Evaporation from hydroelectric reservoirs'],
    correctIndex: 1,
    explanation: 'The grey water footprint measures the volume of freshwater needed to assimilate a load of pollutants so that water quality remains above agreed legal ambient standards.',
    source: 'Water Footprint Network',
    tag: 'Pollution Accounting'
  },
  {
    id: 'wtr-10',
    topic: 'Water',
    difficulty: 'Easy',
    question: 'An unattended standard garden hose left running for just one hour can consume approximately how much water?',
    options: ['About 50 litres', 'About 200 litres', 'About 1,000 litres or more', 'About 10,000 litres'],
    correctIndex: 2,
    explanation: 'A standard household garden hose running at typical municipal pressure discharges about 17 to 25 litres per minute, wasting 1,000 litres or more in a single hour.',
    source: 'US EPA WaterSense',
    tag: 'Outdoor Water Use'
  },
  {
    id: 'wtr-11',
    topic: 'Water',
    difficulty: 'Medium',
    question: 'According to the Ramsar Convention, how much carbon do global peatlands store relative to the world\'s forests?',
    options: ['Less than 10%', 'About half as much', 'Roughly the same amount', 'At least twice as much as all world forests combined'],
    correctIndex: 3,
    explanation: 'Although peatlands cover only about 3% of the world\'s terrestrial land area, their waterlogged soils store at least twice as much carbon as all global forest biomass combined.',
    source: 'Ramsar Convention',
    tag: 'Peatland Blue Carbon'
  },

  // ==========================================
  // TOPIC 3: ENERGY (11 questions)
  // ==========================================
  {
    id: 'en-01',
    topic: 'Energy',
    difficulty: 'Easy',
    question: 'According to the US Department of Energy, how much less energy do residential LED bulbs use compared to traditional incandescent lighting?',
    options: ['At least 25% less', 'At least 50% less', 'At least 75% less', 'Exactly 100% less'],
    correctIndex: 2,
    explanation: 'Residential LEDs use at least 75% less energy and last up to 25 times longer than incandescent bulbs, substantially slashing utility emissions.',
    source: 'US Department of Energy',
    tag: 'Lighting Efficiency'
  },
  {
    id: 'en-02',
    topic: 'Energy',
    difficulty: 'Easy',
    question: 'How long can a quality ENERGY STAR rated LED bulb operate compared to an equivalent incandescent bulb?',
    options: ['About 2 times longer', 'About 5 times longer', 'At least 25 times longer', 'Equal lifespan'],
    correctIndex: 2,
    explanation: 'Quality LEDs have an operational lifespan of 15,000 to 25,000 hours or more, lasting at least 25 times longer than typical 1,000-hour incandescent bulbs.',
    source: 'US Department of Energy',
    tag: 'Appliance Longevity'
  },
  {
    id: 'en-03',
    topic: 'Energy',
    difficulty: 'Medium',
    question: 'What percentage of an average household\'s electricity consumption is typically lost to "phantom loads" (standby power from plugged-in devices)?',
    options: ['Less than 1%', 'About 5% to 10%', 'Around 35%', 'Over 60%'],
    correctIndex: 1,
    explanation: 'The US Department of Energy estimates that standby power from electronics left in sleep or standby mode consumes about 5% to 10% of total residential electricity use.',
    source: 'US Department of Energy',
    tag: 'Phantom Loads'
  },
  {
    id: 'en-04',
    topic: 'Energy',
    difficulty: 'Hard',
    question: 'By how much can modern high-efficiency air-source heat pumps reduce electricity use for space heating compared to electric resistance heaters?',
    options: ['About 10%', 'About 25%', 'About 50%', 'About 90%'],
    correctIndex: 2,
    explanation: 'Because heat pumps transfer thermal energy rather than generating it from scratch, they can cut heating electricity use by about 50% compared to baseboard resistance heaters.',
    source: 'US Department of Energy',
    tag: 'Heat Pumps'
  },
  {
    id: 'en-05',
    topic: 'Energy',
    difficulty: 'Medium',
    question: 'Compared to standard models, how much less energy and water do ENERGY STAR certified residential clothes washers typically consume?',
    options: ['About 5% less', 'About 25% less energy and 33% less water', 'About 60% less energy and 70% less water', 'They use the same energy'],
    correctIndex: 1,
    explanation: 'ENERGY STAR certified washing machines use about 25% less electrical energy and about 33% less water than conventional non-certified washers.',
    source: 'US Department of Energy',
    tag: 'Home Appliances'
  },
  {
    id: 'en-06',
    topic: 'Energy',
    difficulty: 'Medium',
    question: 'What performance metric does the US Department of Energy use to measure the seasonal cooling efficiency of central air conditioning units?',
    options: ['SEER (Seasonal Energy Efficiency Ratio)', 'BTU per minute', 'Kelvin Delta Factor', 'Ohmic Loss Index'],
    correctIndex: 0,
    explanation: 'SEER (Seasonal Energy Efficiency Ratio) measures total seasonal cooling output in BTUs divided by total electrical energy input in watt-hours over a typical cooling season.',
    source: 'US Department of Energy',
    tag: 'Cooling Standards'
  },
  {
    id: 'en-07',
    topic: 'Energy',
    difficulty: 'Easy',
    question: 'What percentage of the energy consumed by a residential washing machine cycle goes strictly toward heating the wash water?',
    options: ['About 10%', 'About 30%', 'About 75% to 90%', 'Less than 5%'],
    correctIndex: 2,
    explanation: 'About 75% to 90% of the energy consumed to wash clothes goes strictly to heating the water; switching to cold-water wash cycles dramatically saves electricity.',
    source: 'US Department of Energy',
    tag: 'Domestic Conservation'
  },
  {
    id: 'en-08',
    topic: 'Energy',
    difficulty: 'Hard',
    question: 'In building thermal efficiency, what physical property does the insulation rating "R-value" describe?',
    options: ['Reflectance of infrared radiation', 'Resistance to conductive heat flow', 'Rate of convection currents', 'Radial solar transmittance'],
    correctIndex: 1,
    explanation: 'An insulation material\'s R-value measures its thermal resistance to conductive heat flow; the higher the R-value per inch, the greater its insulating performance.',
    source: 'US Department of Energy',
    tag: 'Building Envelope'
  },
  {
    id: 'en-09',
    topic: 'Energy',
    difficulty: 'Hard',
    question: 'Which clean marine energy technology harnesses the temperature gradient between warm ocean surface waters and cold deep sea water?',
    options: ['Tidal barrage turbine', 'Wave oscillatory column', 'Ocean Thermal Energy Conversion (OTEC)', 'Salinity gradient osmosis'],
    correctIndex: 2,
    explanation: 'Ocean Thermal Energy Conversion (OTEC) utilizes the temperature difference between warm tropical surface seawater and cold deep ocean water to run a vapor turbine cycle.',
    source: 'US Department of Energy',
    tag: 'Marine Energy'
  },
  {
    id: 'en-10',
    topic: 'Energy',
    difficulty: 'Medium',
    question: 'What is the typical commercial conversion efficiency range for standard silicon photovoltaic (PV) solar panels today?',
    options: ['About 5% to 8%', 'About 17% to 23%', 'About 55% to 65%', 'Nearly 95%'],
    correctIndex: 1,
    explanation: 'Most commercial silicon photovoltaic modules operate at conversion efficiencies of about 17% to 23% under Standard Test Conditions (STC).',
    source: 'US Department of Energy',
    tag: 'Solar Photovoltaics'
  },
  {
    id: 'en-11',
    topic: 'Energy',
    difficulty: 'Easy',
    question: 'According to the US Department of Energy, using a programmable or smart thermostat properly can save about how much on annual heating and cooling bills?',
    options: ['About 1% to 2%', 'About 8% to 10%', 'About 45%', 'Around 80%'],
    correctIndex: 1,
    explanation: 'Homeowners can save about 8% to 10% a year on heating and cooling by turning back thermostats 7° to 10°F from their normal setting for 8 hours a day.',
    source: 'US Department of Energy',
    tag: 'Smart Controls'
  },

  // ==========================================
  // TOPIC 4: CLIMATE (11 questions)
  // ==========================================
  {
    id: 'clm-01',
    topic: 'Climate',
    difficulty: 'Easy',
    question: 'According to the IPCC Sixth Assessment Report (AR6), by approximately how much has global surface temperature warmed relative to the 1850–1900 baseline?',
    options: ['About 0.3°C', 'About 1.1°C', 'About 2.5°C', 'About 4.0°C'],
    correctIndex: 1,
    explanation: 'The IPCC AR6 confirms that global surface temperature was about 1.1°C higher in 2011–2020 than in the pre-industrial baseline period of 1850–1900, driven by human activities.',
    source: 'IPCC',
    tag: 'Global Warming'
  },
  {
    id: 'clm-02',
    topic: 'Climate',
    difficulty: 'Easy',
    question: 'What long-term global temperature goal is formally established in Article 2 of the Paris Agreement?',
    options: ['Hold warming to exactly 0.0°C', 'Hold warming well below 2.0°C and pursue efforts to limit it to 1.5°C', 'Permit warming up to 3.5°C by 2100', 'Freeze carbon taxes globally'],
    correctIndex: 1,
    explanation: 'The Paris Agreement aims to hold the increase in global average temperature to well below 2.0°C above pre-industrial levels and pursue efforts to limit the increase to 1.5°C.',
    source: 'Paris Agreement',
    tag: 'Climate Treaties'
  },
  {
    id: 'clm-03',
    topic: 'Climate',
    difficulty: 'Medium',
    question: 'Under the landmark 1987 Montreal Protocol, which class of synthetic industrial compounds was phased out to heal the stratospheric ozone layer?',
    options: ['Chlorofluorocarbons (CFCs)', 'Nitrogen gas (N2)', 'Argon (Ar)', 'Helium (He)'],
    correctIndex: 0,
    explanation: 'The Montreal Protocol successfully phased out the production and consumption of chlorofluorocarbons (CFCs) and related halons that catalyzed the breakdown of stratospheric ozone.',
    source: 'Montreal Protocol',
    tag: 'Ozone Protection'
  },
  {
    id: 'clm-04',
    topic: 'Climate',
    difficulty: 'Hard',
    question: 'The 2016 Kigali Amendment to the Montreal Protocol mandates the progressive global phase-down of which potent greenhouse gas family?',
    options: ['Hydrofluorocarbons (HFCs)', 'Carbon monoxide (CO)', 'Sulfur dioxide (SO2)', 'Oxygen isotopes'],
    correctIndex: 0,
    explanation: 'The Kigali Amendment introduced binding phase-down schedules for hydrofluorocarbons (HFCs), which replaced CFCs as refrigerants but carry potent Global Warming Potentials.',
    source: 'Montreal Protocol',
    tag: 'Kigali Amendment'
  },
  {
    id: 'clm-05',
    topic: 'Climate',
    difficulty: 'Medium',
    question: 'Under the Paris Agreement ratchet mechanism, how frequently must signatory nations submit updated Nationally Determined Contributions (NDCs)?',
    options: ['Every year', 'Every 5 years', 'Every 15 years', 'Only once upon signing'],
    correctIndex: 1,
    explanation: 'Article 4 of the Paris Agreement requires parties to communicate or update their Nationally Determined Contributions (NDCs) every 5 years, representing a progression of ambition.',
    source: 'Paris Agreement',
    tag: 'NDC Ratchet Mechanism'
  },
  {
    id: 'clm-06',
    topic: 'Climate',
    difficulty: 'Hard',
    question: 'Over a 20-year timescale (GWP20), how does the warming impact of atmospheric methane (CH4) compare to that of carbon dioxide (CO2)?',
    options: ['Equal to CO2', 'About 10 times higher', 'About 80 to 84 times higher', 'Thousands of times lower'],
    correctIndex: 2,
    explanation: 'According to the IPCC, methane has a Global Warming Potential over 20 years (GWP20) of approximately 80 to 84, making immediate methane reductions critical for near-term warming abatement.',
    source: 'IPCC',
    tag: 'Methane GWP'
  },
  {
    id: 'clm-07',
    topic: 'Climate',
    difficulty: 'Easy',
    question: 'According to the IPCC, what proportion of total cumulative anthropogenic greenhouse gas emissions historically comes from carbon dioxide (CO2)?',
    options: ['About 20%', 'About 40%', 'About 75%', 'Less than 5%'],
    correctIndex: 2,
    explanation: 'Carbon dioxide emissions from fossil fuel combustion and industrial land-use changes account for approximately 75% of total annual human-caused greenhouse gas emissions.',
    source: 'IPCC',
    tag: 'Emission Profiles'
  },
  {
    id: 'clm-08',
    topic: 'Climate',
    difficulty: 'Medium',
    question: 'Over which geographical region does seasonal stratospheric ozone thinning (the "ozone hole") primarily develop during its springtime?',
    options: ['Equatorial Africa', 'Antarctica', 'The Sahara Desert', 'Western Europe'],
    correctIndex: 1,
    explanation: 'Polar stratospheric clouds forming in extreme cold over Antarctica provide the catalytic surface for chlorine-driven ozone destruction each southern spring (September–October).',
    source: 'Montreal Protocol',
    tag: 'Ozone Hole'
  },
  {
    id: 'clm-09',
    topic: 'Climate',
    difficulty: 'Medium',
    question: 'Ocean acidification is primarily driven by seawater absorbing excess emissions of which atmospheric gas?',
    options: ['Nitrogen gas (N2)', 'Carbon dioxide (CO2)', 'Methane (CH4)', 'Ozone (O3)'],
    correctIndex: 1,
    explanation: 'The oceans absorb about 25% of annual human CO2 emissions, reacting with water to form carbonic acid, which reduces seawater pH and impairs calcifying marine organisms.',
    source: 'IPCC',
    tag: 'Ocean Acidification'
  },
  {
    id: 'clm-10',
    topic: 'Climate',
    difficulty: 'Hard',
    question: 'To limit global warming to 1.5°C with no or limited overshoot, around what year does the IPCC AR6 indicate net-zero global CO2 emissions must be reached?',
    options: ['Around 2030', 'Around 2050', 'Around 2090', 'Around 2150'],
    correctIndex: 1,
    explanation: 'IPCC modeled pathways limiting warming to 1.5°C require reaching net-zero global CO2 emissions around 2050, alongside rapid reductions in other non-CO2 greenhouse gases.',
    source: 'IPCC',
    tag: 'Net-Zero Pathways'
  },
  {
    id: 'clm-11',
    topic: 'Climate',
    difficulty: 'Hard',
    question: 'In IPCC scientific terminology, what does the "remaining carbon budget" represent?',
    options: ['Total global revenue raised from carbon offset registries', 'The estimated cumulative net CO2 emissions allowed to stay below a given warming limit', 'The economic cost of building sea dikes', 'The quantity of coal remaining in underground mines'],
    correctIndex: 1,
    explanation: 'The remaining carbon budget expresses the estimated cumulative net amount of CO2 that human activities can still emit for a specified likelihood of limiting warming to a chosen temperature target.',
    source: 'IPCC',
    tag: 'Carbon Budget'
  },

  // ==========================================
  // TOPIC 5: BIODIVERSITY (12 questions)
  // ==========================================
  {
    id: 'bio-01',
    topic: 'Biodiversity',
    difficulty: 'Easy',
    question: 'According to the IUCN Red List of Threatened Species, more than how many assessed species are currently classified as threatened with extinction globally?',
    options: ['About 500 species', 'About 3,000 species', 'Over 44,000 species', 'Over 5,000,000 species'],
    correctIndex: 2,
    explanation: 'Out of over 157,000 assessed species on the IUCN Red List, more than 44,000 species of animals, plants, and fungi are officially classified as threatened with extinction.',
    source: 'IUCN Red List',
    tag: 'Extinction Risk'
  },
  {
    id: 'bio-02',
    topic: 'Biodiversity',
    difficulty: 'Easy',
    question: 'Which three formal categories on the IUCN Red List collectively define species that are "threatened with extinction"?',
    options: ['Least Concern, Near Threatened, Extinct', 'Vulnerable (VU), Endangered (EN), and Critically Endangered (CR)', 'Domesticated, Wild, Feral', 'Abundant, Rare, Fossilized'],
    correctIndex: 1,
    explanation: 'The IUCN Red List groups species facing elevated risks of extinction into three threatened categories: Vulnerable (VU), Endangered (EN), and Critically Endangered (CR).',
    source: 'IUCN Red List',
    tag: 'IUCN Categories'
  },
  {
    id: 'bio-03',
    topic: 'Biodiversity',
    difficulty: 'Medium',
    question: 'What level of international wildlife protection is established under Appendix I of the CITES treaty?',
    options: ['Unrestricted open commercial export', 'Commercial international trade in wild specimens is generally prohibited', 'A mandatory 10% tariff on import', 'Voluntary quarterly reporting'],
    correctIndex: 1,
    explanation: 'CITES Appendix I lists species threatened with extinction; commercial international trade in wild specimens of these species is strictly prohibited.',
    source: 'CITES',
    tag: 'Wildlife Trade'
  },
  {
    id: 'bio-04',
    topic: 'Biodiversity',
    difficulty: 'Medium',
    question: 'Which species are included under Appendix II of the CITES international wildlife convention?',
    options: ['Species already extinct in the wild', 'Species not necessarily currently threatened with extinction, but whose trade must be controlled to prevent overexploitation', 'Only domesticated livestock', 'Fossilized dinosaur remains'],
    correctIndex: 1,
    explanation: 'Appendix II covers species that are not presently threatened with extinction, but in which trade must be controlled to ensure utilization does not threaten their survival.',
    source: 'CITES',
    tag: 'Trade Regulation'
  },
  {
    id: 'bio-05',
    topic: 'Biodiversity',
    difficulty: 'Easy',
    question: 'Which critical coastal ecosystems recognized under Ramsar and IUCN frameworks serve as vital "blue carbon" sinks?',
    options: ['Mangroves, tidal salt marshes, and seagrass meadows', 'Deep ocean trenches without light', 'Concrete harbor breakwaters', 'Open pelagic dead zones'],
    correctIndex: 0,
    explanation: 'Mangroves, tidal marshes, and seagrasses are coastal vegetated ecosystems that capture and store significant organic carbon in their sediments for centuries.',
    source: 'Ramsar Convention',
    tag: 'Blue Carbon Habitats'
  },
  {
    id: 'bio-06',
    topic: 'Biodiversity',
    difficulty: 'Hard',
    question: 'Per unit area, at what rate can healthy mangrove soils sequester carbon compared to terrestrial temperate forests?',
    options: ['Roughly the same rate', 'Half the rate of land forests', 'Up to 5 to 10 times higher per hectare', 'Mangroves do not store carbon'],
    correctIndex: 2,
    explanation: 'Ramsar reports note that coastal wetland sediments sequester carbon at rates up to 5 to 10 times greater per hectare than temperate terrestrial forests because waterlogged soils slow decomposition.',
    source: 'Ramsar Convention',
    tag: 'Carbon Sequestration'
  },
  {
    id: 'bio-07',
    topic: 'Biodiversity',
    difficulty: 'Medium',
    question: 'According to IUCN Red List assessments, approximately what percentage of all assessed amphibian species are threatened with extinction?',
    options: ['About 5%', 'About 12%', 'About 41%', 'Over 90%'],
    correctIndex: 2,
    explanation: 'Amphibians are the most threatened vertebrate class on the IUCN Red List, with approximately 41% of assessed species threatened by chytridiomycosis fungal disease and habitat destruction.',
    source: 'IUCN Red List',
    tag: 'Amphibian Crisis'
  },
  {
    id: 'bio-08',
    topic: 'Biodiversity',
    difficulty: 'Medium',
    question: 'According to IUCN Red List data, roughly what percentage of evaluated reef-building coral species are threatened with extinction?',
    options: ['About 1%', 'About 33%', 'About 80%', 'Zero percent'],
    correctIndex: 1,
    explanation: 'About 33% of reef-building coral species are classified as threatened with extinction, vulnerable to marine heatwaves, thermal bleaching events, and ocean acidification.',
    source: 'IUCN Red List',
    tag: 'Coral Reefs'
  },
  {
    id: 'bio-09',
    topic: 'Biodiversity',
    difficulty: 'Hard',
    question: 'What is the "Montreux Record" maintained under the Ramsar Convention on Wetlands?',
    options: ['A database of the highest altitude wetlands', 'A register of Ramsar wetland sites where adverse ecological character changes have occurred or are likely', 'A directory of commercial peat harvesting facilities', 'A list of migratory waterfowl species'],
    correctIndex: 1,
    explanation: 'The Montreux Record is a specialized register of wetland sites on the Ramsar List where changes in ecological character have occurred, are occurring, or are likely to occur as a result of human activities.',
    source: 'Ramsar Convention',
    tag: 'Montreux Record'
  },
  {
    id: 'bio-10',
    topic: 'Biodiversity',
    difficulty: 'Hard',
    question: 'In what year was the CITES convention originally agreed upon by governments in Washington, D.C.?',
    options: ['1945', '1973', '1992', '2015'],
    correctIndex: 1,
    explanation: 'CITES was agreed upon at a meeting of representatives of 80 countries in Washington, D.C., on 3 March 1973, and officially entered into force on 1 July 1975.',
    source: 'CITES',
    tag: 'CITES History'
  },
  {
    id: 'bio-11',
    topic: 'Biodiversity',
    difficulty: 'Easy',
    question: 'In ecological science, what term describes a species whose presence and activities exert disproportionate control over ecosystem structure relative to its abundance?',
    options: ['Keystone species', 'Invasive weed', 'Apex parasite', 'Transient visitor'],
    correctIndex: 0,
    explanation: 'A keystone species (such as sea otters in kelp forests or wolves in riparian corridors) exerts profound regulatory effects on community diversity and trophic balance.',
    source: 'IUCN Red List',
    tag: 'Ecosystem Ecology'
  },
  {
    id: 'bio-12',
    topic: 'Biodiversity',
    difficulty: 'Medium',
    question: 'What does the IUCN Red List classification "Data Deficient" (DD) officially indicate?',
    options: ['The species is confirmed to be completely extinct', 'Inadequate information to make a direct or indirect extinction risk assessment based on distribution or population', 'The species is completely safe from all threats', 'The species exists only in commercial seed banks'],
    correctIndex: 1,
    explanation: 'Data Deficient (DD) means there is inadequate information to apply the IUCN criteria to assess extinction risk, highlighting an urgent need for more targeted field biology research.',
    source: 'IUCN Red List',
    tag: 'Data Deficient Taxa'
  }
];

export const TOPIC_SUMMARIES: Record<
  Topic,
  {
    title: string;
    count: number;
    icon: string;
    color: string;
    description: string;
    sampleQuestion: string;
    sampleAnswer: string;
  }
> = {
  Waste: {
    title: 'Waste & Circular Economy',
    count: 11,
    icon: 'Recycle',
    color: '#E06D3B',
    description: 'Master facts on metal recycling, India\'s 2022 EPR rules, PET degradation, and composting C:N ratios.',
    sampleQuestion: 'How much less energy does recycling aluminium consume compared to producing from raw bauxite ore?',
    sampleAnswer: 'About 95% less energy (US Department of Energy)'
  },
  Water: {
    title: 'Water & Hydrology',
    count: 11,
    icon: 'Droplet',
    color: '#38bdf8',
    description: 'Uncover tap leak waste, virtual water in cotton and beef, WaterSense benchmarks, and Ramsar peatlands.',
    sampleQuestion: 'How much water can a single dripping tap waste in one year according to US EPA WaterSense?',
    sampleAnswer: 'About 11,000 litres / >3,000 gallons (US EPA WaterSense)'
  },
  Energy: {
    title: 'Energy & Efficiency',
    count: 11,
    icon: 'Zap',
    color: '#fbbf24',
    description: 'Explore LED efficiency, phantom loads, heat pump energy cuts, smart thermostats, and solar PV metrics.',
    sampleQuestion: 'How much less energy do residential LED bulbs use compared to incandescent bulbs?',
    sampleAnswer: 'At least 75% less energy (US Department of Energy)'
  },
  Climate: {
    title: 'Climate Science & Treaties',
    count: 11,
    icon: 'Globe',
    color: '#f87171',
    description: 'Understand global temperature anomalies, IPCC net-zero deadlines, Paris targets, and Montreal Protocol rules.',
    sampleQuestion: 'By how much has global surface temperature warmed relative to the 1850–1900 pre-industrial baseline?',
    sampleAnswer: 'About 1.1°C above pre-industrial levels (IPCC AR6)'
  },
  Biodiversity: {
    title: 'Biodiversity & Conservation',
    count: 12,
    icon: 'Shield',
    color: '#A78BFA',
    description: 'Analyze IUCN Red List statistics, CITES trade appendices, amphibian vulnerabilities, and blue carbon sinks.',
    sampleQuestion: 'How many assessed species are currently classified as threatened with extinction on the IUCN Red List?',
    sampleAnswer: 'Over 44,000 species (IUCN Red List)'
  }
};
