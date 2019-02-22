const arrF = require('./arr');
const splitBy = arrF.splitBy;

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
	{},
	{p1: true, p2: 2, p3: 'three'}
];

describe('splitBy function testing', () =>
{
	test('bad arguments', () =>
	{
		expect(splitBy( [] )).toEqual( {} );

		for (let i = 0; i < args.length; i++)
		{
			if (!args[i])
				expect(splitBy( args[i] )).toEqual( {} );
			else
			{
				try
				{
					expect(splitBy( args[i] )).toEqual( {undefined: [ args[i] ] } );
				}
				catch(err)
				{
					let newKey = String(args[i]);
					errs[newKey] = err;
				}
			}
			for (let j = 0; j < args.length; j++)
			{
				if (!args[i])
					expect(splitBy( args[i], args[j] )).toEqual( {} );
				else
				{
					try
					{
						result = {};
						result[String(args[j])] = [ args[i] ];
						expect(splitBy( args[i], args[j] )).toEqual( result );
					}
					catch(err)
					{
						let newKey = String(args[i]) + '_' + String(args[j]);
						errs[newKey] = err;
					}
				}
			}
		}
	});

	describe('Good array', () =>
	{
		function Obj(p1,p2,p3)
		{
			this.p1 = p1;
			this.p2 = p2;
			this.p3 = p3;
		}

		var obj1 = new Obj(true, 3, 'b string');
		var obj2 = new Obj(true, 2, 'd string');
		var obj3 = new Obj(false, 1, 'c string');
		var obj4 = new Obj(false, 4, 'a string');

		var arr = [obj1, obj2, obj3, obj4];

		var splitArr = {
			undefined: [
				{ p1: true, p2: 3, p3: 'b string' },
				{ p1: true, p2: 2, p3: 'd string' },
				{ p1: false, p2: 1, p3: 'c string' },
	       		{ p1: false, p2: 4, p3: 'a string' }
			]
		}

		var splitArrP1 = {
			true: [
				{ p1: true, p2: 3, p3: 'b string' },
				{ p1: true, p2: 2, p3: 'd string' }
			],
			false: [
				{ p1: false, p2: 1, p3: 'c string' },
	       		{ p1: false, p2: 4, p3: 'a string' }
	       	]
	    }

		test('good arguments', () =>
		{
	        // Split by 'undefined'
	        expect(splitBy(arr)).toEqual(splitArr);
	        expect(splitBy(arr, 'badProp')).toEqual(splitArr);

			expect(splitBy(arr, 'p1')).toEqual(splitArrP1);
		});
		// Invalid property names will result in "TypeError: path.split is not a function"
	});
});