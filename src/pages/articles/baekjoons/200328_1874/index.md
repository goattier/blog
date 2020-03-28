---
title: "[백준] 1874 : 스택 수열"
date: "2020-03-28"
layout: post
draft: false
path: "/posts/baekjoons/1874/"
category: "백준"
tags:
  - "백준"
  - "Algorithm"
description: "백준 1874번 문제 : 스택 수열"
---

# 1874번 : 스택 수열

👉 [문제 바로가기](https://www.acmicpc.net/problem/1874)


## 배경 지식
- `스택(Stack)` : 한 쪽 끝에서만 자료를 넣거나 뺄 수 있는 선형 구조(LIFO - Last In First Out)

## 푼 방법
1부터 n까지의 수를 stack에 push or pop하면서 주어진 수열을 만들 수 있는지 판독하는 알고리즘을 만드는 문제이다.

**1부터 순서대로 stack에 push**하면서 **수열의 수를 만나면 비교**해서 **똑같으면 pop한 후 수열의 다음 수로 넘어가서 위 과정을 반복, 똑같지 않다면 stack으로 주어진 수열을 만드는 것은 불가능하니 'NO'를 출력**하면 된다.


## 내 정답 코드 (C++)

~~~c
#include <iostream>
#include <vector>
#include <stack>

int main() {
	std::ios::sync_with_stdio(false);
	std::cin.tie(NULL); 
	std::cout.tie(NULL);
	
	int n, idx = 0;
	int num[100000];
	std::stack<int> stack;
	std::vector<char> op;
	
	std::cin >> n;
	
	for (int i = 0; i < n; ++i)
		std::cin >> num[i];
	
	for (int i = 1; i <= n; ++i) {
		if (i <= num[idx]) { // i <= 수열[idx]이면 push(+)
			stack.push(i);
			op.emplace_back('+');	
		}
		
		while (num[idx] <= i && num[idx] != 0) { // 수열[idx] <= i이면 pop(-) or NO
			int peak = stack.top();
			
			if (peak == num[idx]) { // top이 수열[idx]와 같으면 pop(-)
				stack.pop();
				op.emplace_back('-');
			}
			else { // top이 수열[idx]와 같지 않으면 'NO' 출력 후 종료
				std::cout << "NO" << std::endl;
				return 0;
			}
			++idx;
		}
	}
	
	std::vector<char>::iterator iter = op.begin();
	for (;iter != op.end(); ++iter)
		std::cout << *iter << '\n';
	
	return 0;
}
~~~
