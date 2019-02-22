const arrF = require('./arr');
const sortBy = arrF.sortBy;

var errs = {}

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
	{p1: true, p2: 2, p3: 'three'},
	{ p1:true, p2:2, p3:'three', p4:[4, 'four'], p5:{p1:5,p2:'five'} }
];

describe('sortBy function tests', () =>
{
	test('bad arguements', () =>
	{
		for (let i = 0; i < args.length; i++)
		{
			if (args[i])
				expect(sortBy( args[i] )).toEqual( [ args[i] ] );
			else
				expect(sortBy( args[i] )).toEqual( [] );

			for (let j = 0; j < args.length; j++)
			{
				if (args[i])
					expect(sortBy( args[i], args[j] )).toEqual( [ args[i] ] );
				else
					expect(sortBy( args[i], args[j] )).toEqual( [] );

				for (let k = 0; k < args.length; k++)
				{
					if (args[i])
						expect(sortBy(args[i], args[j], args[k] )).toEqual( [ args[i] ] );
					else
						expect(sortBy(args[i], args[j], args[k] )).toEqual( [] );
				}
			}
		}
	});

	test('non object array', () =>
	{
		var arr = [true, 2, 'three'];

		expect(sortBy( [] )).toEqual( [] );
		expect(sortBy( arr )).toEqual( arr );

		for (let i = 0; i < args.length; i++)
		{
			try
			{
				expect(sortBy( [], args[i] )).toEqual( [] );
			}
			catch(err)
			{
				let newKey = String(args[i]);
				errs[newKey] = String(err);
			}
			try
			{
				expect(sortBy( arr, args[i] )).toEqual( arr );
			}
			catch(err)
			{
				let newKey = String(args[i]);
				errs[newKey] = String(err);
			}

			for (let j = 0; j < args.length; j++)
			{
				try
				{
					expect(sortBy( [], args[i], args[j] )).toEqual( [] );
				}
				catch(err)
				{
					let newKey = String(args[i]) + '-' + String(args[j]);
					errs[newKey] = String(err);
				}

				try
				{
					if (i === 0 || i === 1)
						if (args[j])
							expect(sortBy(arr, args[i], args[j] )).toEqual( ['three', 2, true] );
					else
						expect(sortBy(arr, args[i], args[j] )).toEqual(arr);
				}
				catch(err)
				{
					let newKey = String(args[i]) + '-' + String(args[j]);
					errs[newKey] = String(err);
				}
			}
		}
	});

	test('Good inputs', () =>
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

		var objects = [obj1, obj2, obj3, obj4];

		var objectsByP2 = [obj3, obj2, obj1, obj4];
		var objectsByP2_R = [obj4, obj1, obj2, obj3];

		var objectsByP3 = [obj4, obj1, obj3, obj2];
		var objectsByP3_R = [obj2, obj3, obj1, obj4];

		expect(sortBy(objects, 'p2')).toEqual(objectsByP2);
		expect(sortBy(objects, 'p2', true)).toEqual(objectsByP2_R);

		expect(sortBy(objects, 'p3')).toEqual(objectsByP3);
		expect(sortBy(objects, 'p3', true)).toEqual(objectsByP3_R);

		// Bad property name -> no change to array
		expect(sortBy(objects, 'badPropName')).toEqual(objects);
	});
});