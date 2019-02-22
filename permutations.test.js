const arrF = require('./arr');
const permutations = arrF.permutations;

var errs = {};

var args =
[
	undefined,
	null,
	false,
	true,
	0,
	4,
	2.7
	-3,
	'',
	'a string',
	{},
	{p1: true, p2: 2, p3: 'three'}
];

describe('permutations function testing', () =>
{
	test('bad arguements', () =>
	{
		expect(permutations()).toEqual( [] );

		for (let i = 0; i < args.length; i++)
		{
			if(!args[i])
			{
				expect(permutations( args[i] )).toEqual( [] );
				continue;
			}

			try
			{
				expect(permutations( args[i] )).toEqual( [ args[i] ] );
			}
			catch(err)
			{
				let newKey = String(args[i]);
				errs[newKey] = String(err);
			}
		}
		new Set(Object.values(errs)).forEach(x => console.log(x));
	});

	test('good arguement', () =>
	{
		expect(permutations( [] )).toEqual( [] );

		var shortArr = [true, 2, 'three'];

		var shortArrP =
		[
			[ true, 2 ],
			[ true, 'three' ],
			[ 2, true ],
			[ 2, 'three' ],
			[ 'three', true ],
			[ 'three', 2 ]
		]

		expect(permutations(shortArr)).toEqual(shortArrP);
	});
});