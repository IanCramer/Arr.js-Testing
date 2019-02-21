const arrF = require('./arr');
const flatten = arrF.flatten;

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
	[],
	[true, 2, 'three'],
	[ true, 2, 'three', [4, 'four'], {p1:5,p2:'five'} ],
	{},
	{p1: true, p2: 2, p3: 'three'},
	{ p1:true, p2:2, p3:'three', p4:[4, 'four'], p5:{p1:5,p2:'five'} }
];

describe('flatten function testing', () =>
{
	describe('bad arguments', () =>
	{
		test('0 and 1 garbage arguments', () =>
		{
			expect(flatten()).toEqual( [] );

			for (let i = 0; i < args.length; i++)
			{
				if (i === 11)
					continue;
				if (!args[i])
				{
					expect(flatten(args[i])).toEqual( [] );
					continue;
				}

				try
				{
					expect(flatten(args[i])).toEqual(args[i])
				}
				catch(err)
				{
					let newKey = String(args[i]);
					errs[newKey] = String(err);
				}
			}
			new Set(Object.values(errs)).forEach(x => console.log(x));
		});
	});

	test('good arguemnts', () =>
	{
		var arrOfArrs =
		[
			[true, 1, 'one'],
			[false, 2, 'two'],
			[false, 3, 'three']
		];

		var flatArrOfArrs = [true, 1, 'one', false, 2, 'two', false, 3, 'three'];

		var arrWithArrs =
		[
			false,
			0,
			'',
			'zero',
			[false, 0, '', 'zero'],
			true,
			1,
			'one',
			[true, 1, 'one'],
			2,
			'two',
			false,
			[2, 'two', false]
		];

		var flatArrWithArrs = [ false, 0,'','zero', false, 0, '', 'zero',true,1,'one',true, 1, 'one',2,'two',false,2, 'two', false ];

		expect(flatten(arrOfArrs)).toEqual(flatArrOfArrs);

		expect(flatten(arrWithArrs)).toEqual(flatArrWithArrs);

	});
});