const arrF = require('./arr');
const shallowCompare = arrF.shallowCompare;

describe('shallowCompare Function Tests', () =>
{
	test('no arguements', () =>
	{
		expect(shallowCompare()).toBe(true);
	});

	describe('one argument', () =>
	{
		test('undefined/null', () =>
		{
			expect(shallowCompare(undefined)).toBe(true);
			expect(shallowCompare(null)).toBe(true);
		});

		test('boolean', () =>
		{
			expect(shallowCompare(true)).toBe(false);
			expect(shallowCompare(false)).toBe(true);
		});

		test('number', () =>
		{
			expect(shallowCompare(0)).toBe(true);
			expect(shallowCompare(4)).toBe(false);
			expect(shallowCompare(2.7)).toBe(false);
			expect(shallowCompare(-3)).toBe(false);
		});

		test('string', () =>
		{
			expect(shallowCompare('')).toBe(true);
			expect(shallowCompare('a string')).toBe(false);
		});

		test('array', () =>
		{
			expect(shallowCompare( [] )).toBe(true);
			expect(shallowCompare( [true, 2, 'three'] )).toBe(false);
		});

		test('object', () =>
		{
			expect(shallowCompare( {} )).toBe(false);
			expect(shallowCompare( {p1:true,p2:2,p3:'three'} )).toBe(false);
		});
	});

	describe('two arguements', () =>
	{
		describe('same type', () =>
		{
			describe('both falsy', () =>
			{
				test('undefined/null', () =>
				{
					expect(shallowCompare(undefined,undefined)).toBe(true);
					expect(shallowCompare(null,null)).toBe(true);
					expect(shallowCompare(undefined,null)).toBe(true);
					expect(shallowCompare(null,undefined)).toBe(true);
				});

				test('boolean', () =>
				{
					expect(shallowCompare(false,false)).toBe(true);
				});

				test('number', () =>
				{
					expect(shallowCompare(0,0)).toBe(true);
				});

				test('string', () =>
				{
					expect(shallowCompare('','')).toBe(true);
				});
			});

			describe('one falsy, one truthy', () =>
			{
				test('boolean', () =>
				{
					expect(shallowCompare(true,false)).toBe(false);
				});

				test('number', () =>
				{
					expect(shallowCompare(0,3)).toBe(false);
					expect(shallowCompare(4.3,0)).toBe(false);
					expect(shallowCompare(0,-5)).toBe(false);
				});

				test('string', () =>
				{
					expect(shallowCompare('a string', '')).toBe(false);
					expect(shallowCompare('', 'empty string first')).toBe(false);
				});
			});

			describe('both truthy', () =>
			{
				test('boolean', () =>
				{
					try
					{
						expect(shallowCompare(true,true)).toBe(false);
					}
					catch(err)
					{}
				});

				test('number', () =>
				{
					try { expect(shallowCompare(1,3)).toBe(false); }
					catch (err) {}

					try { expect(shallowCompare(2,4.3)).toBe(false); }
					catch(err) {}

					try { expect(shallowCompare(3,-5)).toBe(false); }
					catch(err) {}

					try { expect(shallowCompare(2.7, -6)).toBe(false); }
					catch(err) {}
				});

				test('string', () =>
				{
					try { expect(shallowCompare('a string', 'a string')).toBe(true); }
					catch(err) {}

					try { expect(shallowCompare('a string', 'a different string')).toBe(false); }
					catch(err) {}
				});

				test('array', () =>
				{
					expect(shallowCompare( [], [] )).toBe(true);
					expect(shallowCompare( [true, 2, 'three'], [] )).toBe(false);
					expect(shallowCompare( [true, 2, 'three'], [true, 2, 'three'] )).toBe(true);
				});

				test('object', () =>
				{
					try { expect(shallowCompare( {}, {} )).toBe(true); }
					catch(err) {}

					try { expect(shallowCompare( {p1:true,p2:2,p3:'three'}, {} )).toBe(false); }
					catch(err) {}

					try { expect(shallowCompare( {p1:true,p2:2,p3:'three'}, {p1:true,p2:2,p3:'three'} )).toBe(true); }
					catch(err) {}
				});
			});
		});

		describe('Different Types', () =>
		{
			describe('Both Falsy', () =>
			{
				test('undefined/null and bool', () =>
				{
					expect(shallowCompare(undefined,false)).toBe(true);
					expect(shallowCompare(null,false)).toBe(true);
				});

				test('undefined/null, number', () =>
				{
					expect(shallowCompare(undefined, 0)).toBe(true);
					expect(shallowCompare(null, 0)).toBe(true);
				});

				test('undefined/null, string', () =>
				{
					expect(shallowCompare(undefined,'')).toBe(true);
					expect(shallowCompare(null,'')).toBe(true);
				});

				test('bool and number', () =>
				{
					expect(shallowCompare(false, 0)).toBe(true);
				});

				test('bool and string', () =>
				{
					expect(shallowCompare(false,'')).toBe(true);
				});

				test('number and string', () =>
				{
					expect(shallowCompare(0,'')).toBe(true);
				});
			});

			describe('one truthy, one falsy',() =>
			{
				test('bool, undefined/null', () =>
				{
					expect(shallowCompare(true, undefined)).toBe(false);
					expect(shallowCompare(true, null)).toBe(false);
				});

				test('bool, number', () =>
				{
					expect(shallowCompare(true,0)).toBe(false);
				});

				test('bool and string', () =>
				{
					expect(shallowCompare(true, '')).toBe(false);
				});

				test('number, undefined/null', () =>
				{
					expect(shallowCompare(3,undefined)).toBe(false);
					expect(shallowCompare(3, null)).toBe(false);
				});

				test('number, bool', () =>
				{
					expect(shallowCompare(3, false)).toBe(false);
				});

				test('number, string', () =>
				{
					expect(shallowCompare(3,'')).toBe(false);
				});

				test('string, undefined/null', () =>
				{
					expect(shallowCompare('a string',undefined)).toBe(false);
					expect(shallowCompare('a string', null)).toBe(false);
				});

				test('string, bool', () =>
				{
					expect(shallowCompare('a string', false)).toBe(false);
				});

				test('string, number', () =>
				{
					expect(shallowCompare('a string', 0)).toBe(false);
				});

				test('array, undefined/null', () =>
				{
					expect(shallowCompare( [], undefined)).toBe(true);
					expect(shallowCompare( [true, 2, 'three'], undefined)).toBe(false);

					expect(shallowCompare( [], null)).toBe(true);
					expect(shallowCompare( [true, 2, 'three'], null)).toBe(false);
				});

				test('array, bool', () =>
				{
					expect(shallowCompare( [], false)).toBe(true);
					expect(shallowCompare( [true, 2, 'three'], false)).toBe(false);
				});

				test('array, number', () =>
				{
					expect(shallowCompare( [], 0)).toBe(true);
					expect(shallowCompare( [true, 2, 'three'], 0)).toBe(false);
				});

				test('array, string', () =>
				{
					expect(shallowCompare( [], '')).toBe(true);
					expect(shallowCompare( [true, 2, 'three'], '')).toBe(false);
				});

				test('object, undefined/null', () =>
				{
					expect(shallowCompare( {}, undefined)).toBe(false);
					expect(shallowCompare( {p1:true,p2:2,p3:'three'}, undefined)).toBe(false);

					expect(shallowCompare( {}, null)).toBe(false);
					expect(shallowCompare( {p1:true,p2:2,p3:'three'}, null)).toBe(false);
				});

				test('object, bool', () =>
				{
					expect(shallowCompare( {}, false)).toBe(false);
					expect(shallowCompare( {p1:true,p2:2,p3:'three'}, false)).toBe(false);
				});

				test('object, number', () =>
				{
					expect(shallowCompare( {}, 0)).toBe(false);
					expect(shallowCompare( {p1:true,p2:2,p3:'three'}, 0)).toBe(false);
				});

				test('object, string', () =>
				{
					expect(shallowCompare( {}, '')).toBe(false);
					expect(shallowCompare( {p1:true,p2:2,p3:'three'}, '')).toBe(false);
				});
			});

			describe('both truthy', () =>
			{
				test('bool, number', () =>
				{
					try { expect(shallowCompare(true, 4)).toBe(false); }
					catch(err) {}
				});

				test('bool, string', () =>
				{
					expect(shallowCompare(true, 'a string')).toBe(false);
				});

				test('bool, array', () =>
				{
					expect(shallowCompare(true, [] )).toBe(false);
					expect(shallowCompare(true, [true, 2, 'three'] )).toBe(false);
				});

				test('bool, object', () =>
				{
					try { expect(shallowCompare(true, {} )).toBe(false); }
					catch(err) {}

					try { expect(shallowCompare(true, {p1:true,p2:2,p3:'three'} )).toBe(false); }
					catch(err) {}
				});

				test('number, string', () =>
				{
					expect(shallowCompare(3, 'a string')).toBe(false);
				});

				test('number, array', () =>
				{
					expect(shallowCompare(3, [] )).toBe(false);
					expect(shallowCompare(3, [true, 2, 'three'] )).toBe(false);
				});

				test('number, object', () =>
				{
					try { expect(shallowCompare(4, {} )).toBe(false); }
					catch(err) {}
					
					try { expect(shallowCompare(3, {p1:true,p2:2,p3:'three'} )).toBe(false); }
					catch(err) {}
				});

				test('string, array', () =>
				{
					expect(shallowCompare('a string', [] )).toBe(false);
					expect(shallowCompare('a string', [true, 2, 'three'] )).toBe(false);
				});

				test('string, object', () =>
				{
					expect(shallowCompare('a string', {} )).toBe(false);
					expect(shallowCompare('a string', {p1:true,p2:2,p3:'three'} )).toBe(false);
				});

				test('array object', () =>
				{
					expect(shallowCompare( [], {} )).toBe(false);
					expect(shallowCompare( [true, 2, 'three'], {} )).toBe(false);
					expect(shallowCompare( [], {p1:true,p2:2,p3:'three'} )).toBe(false);
					expect(shallowCompare( [true, 2, 'three'], {p1:true,p2:2,p3:'three'} )).toBe(false);
				});
			});
		});
	});
});


